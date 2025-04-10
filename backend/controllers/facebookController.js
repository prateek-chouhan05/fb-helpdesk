// controllers/authController.js
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  FB_REDIRECT_URI,
  FB_APP_ID,
  FB_APP_SECRET,
} = require("../config");
const { User, Page } = require("../models");
const logger = require("../utils/logger");

exports.facebookAuth = (req, res) => {
  const redirectUri = encodeURIComponent(FB_REDIRECT_URI);
  const token = req.query.token;

  const scope = [
    "pages_show_list",
    "pages_manage_metadata",
    "pages_messaging",
    "pages_read_engagement",
  ].join(",");

  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${token}`;

  res.redirect(fbAuthUrl);
};

exports.facebookCallback = async (req, res) => {
  const { code, state } = req.query;

  try {
    const decoded = jwt.verify(state, JWT_SECRET);
    console.log("🚀 ~ exports.facebookCallback ~ decoded:", decoded);

    // 1. Exchange code for short-lived access token
    const tokenRes = await axios.get(
      "https://graph.facebook.com/v19.0/oauth/access_token",
      {
        params: {
          client_id: FB_APP_ID,
          client_secret: FB_APP_SECRET,
          redirect_uri: FB_REDIRECT_URI,
          code,
        },
      }
    );

    const shortToken = tokenRes.data.access_token;

    // 2. Exchange for long-lived token
    const longTokenRes = await axios.get(
      "https://graph.facebook.com/v19.0/oauth/access_token",
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: FB_APP_ID,
          client_secret: FB_APP_SECRET,
          fb_exchange_token: shortToken,
        },
      }
    );

    const userToken = longTokenRes.data.access_token;
    try {
      await User.update(
        {
          fbToken: userToken,
        },
        {
          where: {
            id: decoded.id,
          },
        }
      );
    } catch (error) {
      logger.error("Unable to update user:", error);
    }

    // 3. Get user pages
    const pageRes = await axios.get(
      "https://graph.facebook.com/v19.0/me/accounts",
      {
        params: {
          access_token: userToken,
        },
      }
    );

    const pages = pageRes.data.data;

    if (pages.length > 0) {
      const pagesToInsert = pages.map((p) => ({
        title: p.name,
        pageId: p.id,
        accessToken: p.access_token,
        userId: decoded.id,
      }));

      try {
        await Page.bulkCreate(pagesToInsert);
      } catch (error) {
        logger.error("Unable to insert pages:", error);
      }
    }

    // 5. Redirect back to dashboard
    res.redirect("http://localhost:3000/connect"); // adjust URL
  } catch (err) {
    console.error(
      "Error during Facebook auth:",
      err.response?.data || err.message
    );
    res.status(500).send("Facebook auth failed");
  }
};

exports.getFacebookStatus = async (req, res) => {
  try {
    const connected = !!req.user?.fbToken;

    let pages = await Page.findAll({
      where: { userId: req.user.id },
      attributes: ["id", "title", "pageId", "accessToken"],
    });

    if (pages.length <= 0) {
      const userToken = req.user.fbToken;

      // fetch pages again from FB API
      const pageRes = await axios.get(
        "https://graph.facebook.com/v19.0/me/accounts",
        {
          params: {
            access_token: userToken,
          },
        }
      );

      const newPages = pageRes.data.data;

      const pagesToUpdate = [];
      const pagesToInsert = [];

      newPages.forEach((page) => {
        const existingPage = pages.find((p) => p.pageId === page.id);
        if (existingPage) {
          if (existingPage.accessToken !== page.access_token) {
            pagesToUpdate.push({
              ...existingPage,
              accessToken: page.access_token,
            });
          }
        } else {
          pagesToInsert.push({
            title: page.name,
            pageId: page.id,
            accessToken: page.access_token,
            userId: req.user.id,
          });
        }
      });

      // update the pages with new access tokens
      if (pagesToUpdate.length > 0) {
        await Promise.all(
          pagesToUpdate.map((page) =>
            Page.update(
              { accessToken: page.accessToken },
              { where: { id: page.id } }
            )
          )
        );
      }

      if (pagesToInsert.length > 0) {
        await Page.bulkCreate(pagesToInsert);
      }
      pages = await Page.findAll({
        where: { userId: req.user.id },
        attributes: ["id", "title", "pageId"],
      });
    }

    res.json({ connected, pages });
  } catch (error) {
    console.error("Error fetching Facebook status:", error);
    res.status(500).json({ error: "Failed to fetch Facebook status" });
  }
};

exports.disconnectFacebook = async (req, res) => {
  try {
    const { pageId } = req.body;

    if (!pageId) {
      return res.status(400).json({ error: "Page ID is required" });
    }

    await Page.destroy({
      where: {
        pageId,
        userId: req.user.id,
      },
    });

    res.json({ message: "Disconnected from Facebook" });
  } catch (error) {
    console.error("Error disconnecting from Facebook:", error);
    res.status(500).json({ error: "Failed to disconnect from Facebook" });
  }
};
