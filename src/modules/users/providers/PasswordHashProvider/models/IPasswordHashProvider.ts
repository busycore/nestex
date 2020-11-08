export default interface IPasswordHashProvider {
  hash(word: string): Promise<string>;
  compare(payload: string, hashed: string): Promise<boolean>;
}
