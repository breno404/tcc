import path from "node:path";
import fs from "node:fs/promises";

class LoggerService implements IObserver {
  private static instance: LoggerService;
  private dir: string;
  private filename: string;
  public observerType: string;

  private constructor(dir?: string, filename?: string) {
    this.dir = dir
      ? path.resolve(dir)
      : path.resolve(__dirname, "../", "../", "log");

    this.filename = filename
      ? filename
      : `error-${new Date().toJSON().slice(0, 10)}.log`;

    this.observerType = "LoggerService";
  }

  static init(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  public update(message?: string) {
    if (message) this.record(message);
  }

  public async record(message: string) {
    const p = path.resolve(this.dir, this.filename);
    const logFile = await fs.open(p, "a");

    const stream = logFile.createWriteStream({ encoding: "utf8" });

    if (!stream.write(message)) {
      console.log(
        `Buffer cheio, esperando para continuar o registro no log ${this.filename} ...`
      );
      stream.once("drain", () => {
        console.log("Stream vazia, continuando...");
      });
    }

    stream.close();
    logFile.close();
  }
}
export default LoggerService;
