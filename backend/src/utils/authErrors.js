// 失败模块
class SomeSpecificError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SomeSpecificError';
  }
}

module.exports = { SomeSpecificError };