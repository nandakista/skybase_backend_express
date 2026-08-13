import snowflake from "snowflake-sdk";
import { snowflakeConnection } from "./snowflake.connection";

export class SnowflakeClient {
  private connection: snowflake.Connection;
  private connected = false;

  constructor() {
    this.connection = snowflakeConnection;
  }

  async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) {
          reject(error);
          return;
        }

        this.connected = true;
        resolve();
      });
    });
  }

  async query<T = Record<string, unknown>>(
    sql: string,
    binds?: snowflake.Binds,
  ): Promise<T[]> {
    await this.connect();

    return new Promise<T[]>((resolve, reject) => {
      this.connection.execute({
        sqlText: sql,
        binds,
        complete: (error, statement, rows) => {
          if (error) {
            reject(error);
            return;
          }

          resolve((rows ?? []) as T[]);
        },
      });
    });
  }

  async disconnect(): Promise<void> {
    if (!this.connected) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      this.connection.destroy((error) => {
        if (error) {
          reject(error);
          return;
        }

        this.connected = false;
        resolve();
      });
    });
  }

  isConnected(): boolean {
    return this.connected;
  }
}

export const snowflakeClient = new SnowflakeClient();