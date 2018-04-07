var sensorcloud = {};

sensorcloud.SampleRate = class
{
    var Type = Object.freeze({seconds: 0, hertz: 1});
    
    constructor(type, value)
    {
        this.type = type;
        this.value = value;
    }

    static hertz(value)
    {
        return new SampleRate(Type.hertz, value);
    }

    static seconds(value)
    {
        return new SampleRate(Type.seconds, value);
    }
};

sensorcloud.Channel = class
{
    constructor(sensor, name)
    {
        this.sensor = sensor;
        this.device = sensor.device;
        this.name = name;
    }

    upload(timestamp, value, sampleRate)
    {
        
    }

    _request(method, url, options)
    {
        var opt = Object.assign({body: null, headers: null}, options);
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function() {
                if(this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({status: this.status, statusText: xhr.statusText});
                }
            };
            xhr.onerror = function() {
                reject({status: this.status, statusText: xhr.statusText});
            };
            for(var header in opt.headers)
            {
                xhr.setRequestHeader(header, opt.headers[header]);
            }
            xhr.send(opt.body);
        });
    }
};

sensorcloud.Sensor = class
{

};

sensorcloud.Device = class 
{
    constructor(name, key)
    {
        this.name = name;
        this.key = key;
    }

    sensor(name)
};
