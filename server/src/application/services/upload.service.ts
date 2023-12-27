import path from "node:path";
import fs from "node:fs";

class UploadService implements IObserver {
  private dir: string;
  private filename: string;
  private mimetype: string;
  private encoding: string;
  private url: string | undefined;
  public observerType: string = "UploadService";

  public constructor(dir?: string, url?: string) {
    this.dir = dir
      ? path.resolve(dir)
      : path.resolve(__dirname, "../", "../", "uploads");

    this.url = url ? url : undefined;
  }

  public update(srcFile: fs.ReadStream): void;
  public update(srcFile: fs.ReadStream, dstFile: fs.WriteStream): void;
  public update(...args: any[]) {
    const [srcFile, dstFile] = args;
    this.upload(srcFile, dstFile);
  }

  /**
   * @param {fs.ReadStream} srcFile Arquivo de origem para ser armazenado no servidor
   * @param {fs.WriteStream} dstFile Arquivo de destino opcional para ser sobrescrito
   */
  public async upload(srcFile: fs.ReadStream, dstFile?: fs.WriteStream) {
    const srcPath = srcFile.path.toString("utf8");
    this.filename = path.basename(srcPath);
    let dstWriteStream: fs.WriteStream;
    let dstPath: string;

    if (dstFile) {
      dstWriteStream = dstFile;
      const tempPath = dstWriteStream.path.toString("utf8");
      this.dir = path.dirname(tempPath);
      this.filename = path.basename(tempPath);
      dstPath = path.resolve(this.dir, this.filename);
    } else {
      dstPath = path.resolve(this.dir, this.filename);
      dstWriteStream = fs.createWriteStream(dstPath);
    }

    srcFile.pipe(dstWriteStream, { end: true });

    return dstPath;
  }
}
export default UploadService;
