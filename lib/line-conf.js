var fs = require('fs');
var byline = require('byline');

var Conf = function (options) {
    if (!(this instanceof Conf)) return new Conf(options);
    options = options || {};
    this.keys = options.keys || [];
    if (options.conf) {
        this._conf = options.conf;
    }
    return this;
};

Conf.prototype._init = function () {
    this.values = [];
    for (var i = 0, l = this.keys.length; i < l; i++) {
        this.values[i] = [];
    }
};

Conf.prototype.get = function (key, value, callback) {
    var row = this.keys.indexOf(key);
    if (row < 0)
        return callback(new Error(key + ' not found'));
    var line = this.values[row].indexOf(value);
    if (line < 0)
        return callback(new Error(key + ' equal ' + value + ' not found'));
    var obj = {};
    for (var i = 0, l = this.keys.length; i < l; i++) {
        obj[this.keys[i]] = this.values[i][line];
    }
    callback(null, obj);
};

/**
 *  @description Set config file path
 *  @return [conf object]
 *  @public
 */
Conf.prototype.setConf = function (conf) {
    if (conf) {
        this._conf = conf;
    }
    return this;
};

/**
 *  @description define config keys
 *  @return [conf object]
 *  @public
 */
Conf.prototype.define = function (keys) {
    if (!keys || typeof keys !== 'object')
        return this;
    this.keys = keys;
    return this;
};

Conf.prototype._read = function (callback) {
    var self = this;
    if (!this.values) this._init();
    if (!this._conf) throw new Error('Config file must be defined.');
    var stream = byline(fs.createReadStream(this._conf, {
        encoding: 'utf8'
    }));

    stream.on('data', function (line) {
        if (line.indexOf('#') === 0) {
            return;
        }
        if (line.match(/\".*\"/g)) {
            line = line.replace(line.match(/\".*\"/g)[0], line.match(/\".*\"/g)[0].replace(/ +/g, '_'));
        }
        line = line.replace(/^\B +/, '').split(/ +/g);
        for (var i = 0, l = self.values.length; i < l; i++) {
            self.values[i].push(line[i] ? line[i].replace(/_/g, ' ').replace(/\"/g, '') : line[i]);
        }
    });

    stream.on('end', function () {
        callback(null);
    });

    stream.on('error', function (error) {
        callback(error);
    });
};

/**
 *  @description Set config file path
 *  @return [conf object]
 *  @public
 */
Conf.prototype.all = function (callback) {
    var self = this;
    if (!self.values) {
        self._read(function (error) {
            if (error) return callback(error);
            callback(null, self.values);
        });
    } else {
        callback(null, self.values);
    }
};

/**
 *  @description Set config file path
 *  @return [conf object]
 *  @public
 */
Conf.prototype.toJSON = function () {
    var obj = {};
    for (var i = 0, l = this.keys.length; i < l; i++) {
        obj[this.keys[i]] = this.values ? this.values[i] : [];
    }
    return obj;
};

module.exports = Conf;
