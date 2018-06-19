import fs from 'fs';

class FileLoader {
  constructor() {
    this.cache = new Map();
  }

  load(pathname, callback) {
    // Serve it from cache if found
    if (this.cache.has(pathname)) {
      callback(null, this.cache.get(pathname));
    } else {
      // Load from file and then cache it.
      this.constructor.loadFromFile(pathname)
        .then((data) => {
          this.cache.set(pathname, data);
          callback(null, data);
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  }

  update(pathname, data, callback) {
    // Remove existing cache for new update
    if (this.cache.has(pathname)) {
      this.cache.delete(pathname);
    }

    // Update the file and cache the new data
    this.constructor.writeToFile(pathname, data)
      .then((content) => {
        this.cache.set(pathname, content);
        callback(null, content);
      })
      .catch((err) => {
        callback(err, null);
      });
  }

  // Clear particular file cache
  clearFileCache(pathname) {
    if (this.cache.has(pathname)) {
      this.cache.delete(pathname);
    }
  }

  // Clear all cache
  clearCache() {
    this.cache.clear();
  }

  static loadFromFile(pathname) {
    return new Promise((resolve, reject) => {
      fs.readFile(pathname, (err, data) => {
        if (err) {
          reject(err);
        } else {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  }

  static writeToFile(pathname, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(pathname, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export default new FileLoader();
