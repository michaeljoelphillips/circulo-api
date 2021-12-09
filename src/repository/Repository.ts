interface Repository<T> {
  all: () => Promise<T[]>;
  find: (id: string) => Promise<T | undefined>;
  add: (obj: T) => Promise<void>;
}

export default Repository;
