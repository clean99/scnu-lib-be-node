export abstract class MockModel<T> {
  protected abstract entityStub: T;

  async create(): Promise<T> {
    return this.entityStub;
  }

  find(): { exec: () => T[] } {
    return {
      exec: (): T[] => [this.entityStub],
    };
  }

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndDelete(): Promise<T> {
    return this.entityStub;
  }
}
