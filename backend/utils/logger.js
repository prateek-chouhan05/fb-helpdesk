const pino = require("pino-http");
const pretty = require("pino-pretty");
const { NODE_ENV } = require("../config");

const loggerConfig = {
  colorize: true, // colorizes the log
  levelFirst: true,
  translateTime: "yyyy-dd-mm, h:MM:ss TT",
  singleLine: NODE_ENV === "production",
  ignore: "pid,hostname",
};

let pinoHttpLogger;

if (NODE_ENV === "development") {
  pinoHttpLogger = pino(
    {
      serializers: {
        req: (req) => ({
          id: req.id,
          method: req.method,
          url: req.url,
        }),
        res: (res) => ({
          statusCode: res.statusCode,
        }),
      },
    },
    pretty(loggerConfig)
  );
} else {
  pinoHttpLogger = pino(pretty(loggerConfig));
}
const logger = {};

const respLogger = pino(
  pretty({ ...loggerConfig, singleLine: false })
).logger.child({});
pinoHttpLogger.responseLogger = pinoHttpLogger.logger.child({
  type: "module: response logger",
});

logger.info = (message, context) => {
  respLogger.info(context, message);
};

logger.error = (message, context) => {
  respLogger.error(context, message);
};

logger.warn = (message, context) => {
  respLogger.warn(context, message);
};

logger.fatal = (message, context) => {
  console.trace();
  respLogger.fatal(context, message);
};

module.exports = logger;

module.exports.pinoHttpLogger = pinoHttpLogger;
