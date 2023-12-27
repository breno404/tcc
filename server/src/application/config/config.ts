const config = {
  host: "localhost",
  port: 3000,
  ssl: false,
  path:'/',
  uri: "",
};

config.uri = `${config.ssl ? "https" : "http"}://${config.host}:${config.port}${config.path}`;

export default config;
