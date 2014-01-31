var LineConf = require('../');
var should = require('should');

var conf = './fixture/lorem.conf';
conf = require('path').resolve(__dirname, conf);
var arr = ['value1', 'value2', 'value3'];

describe('lib / LineConf', function () {

    it('should be a function.', function () {
        LineConf.should.be.a('function');
    });

    it('should be an object.', function () {
        LineConf().should.be.a('object');
    });

    it('should have property.', function () {
        LineConf().keys.should.be.eql([]);
    });

    describe('LineConf / instance', function () {
        var lineConf = LineConf();

        it('should have public function.', function () {
            lineConf.should.have.property('get');
            lineConf.should.have.property('setConf');
            lineConf.should.have.property('define');
            lineConf.should.have.property('toJSON');
        });


        it('should have private function.', function () {
            lineConf.should.have.property('_init');
            lineConf.should.have.property('_read');
        });

        it('should define keys.', function () {
            lineConf.define(arr);
            lineConf.keys.should.be.eql(arr);
        });

        it('should set config file.', function () {
            lineConf.setConf(conf);
            lineConf._conf.should.be.equal(conf);
        });

        it('should to JSON.', function () {
            var obj = lineConf.toJSON();
            obj.should.be.eql({
                value1: [],
                value2: [],
                value3: []
            });
            console.log(obj);
        });

        it('should get all values.', function (done) {
            lineConf.all(function (err, data) {
                should.not.exist(err);
                console.log(data);
                done();
            });
        });

        it('should get value.', function (done) {
            lineConf.get(arr[0], 'lorem11', function (err, data) {
                should.not.exist(err);
                console.log(data);
                done();
            });
        });

        it('should get value error.', function (done) {
            lineConf.get(arr[0], 'lorem14', function (err) {
                should.exist(err);
                console.log(err);
                done();
            });
        });

        it('should get value.', function (done) {
            lineConf.get(arr[4], 'lorem14', function (err) {
                should.exist(err);
                console.log(err);
                done();
            });
        });

        it('should get value', function(done) {
            lineConf.get(arr[1], 'lorem92', function(err, data) {
                should.not.exist(err);
                console.log(data);
                data.value1.should.be.equal('Lorem ipsum dolor sit amet');
                data.value2.should.be.equal('lorem92');
                data.value3.should.be.equal('12312321');
                done();
            });
        });

    });

});
