## line-conf

`line-conf` can manager a config blow:

```
##
# Lorem Test
#
# Lorem ipsum dolor sit amet, consectetur adipisicing elit,
# sed do eiusmod tempor incididunt ut labore et dolore
# magna aliqua. Ut enim ad minim veniam, quis nostrud
# exercitation ullamco laboris nisi ut aliquip ex ea commodo
# consequat. Duis aute irure dolor in reprehenderit in
# voluptate velit esse cillum dolore eu fugiat nulla pariatur.
# Excepteur sint occaecat cupidatat non proident,
# sunt in culpa qui officia deserunt mollit anim id est laborum.
#
##

## value1 value2 value3

lorem11 lorem12 lorem13
lorem21     lorem22 lorem23
lorem31 lorem32       lorem33
lorem41        lorem42         lorem43
lorem51 lorem52 lorem53 lorem54
lorem61 lorem62
        lorem72 lorem73
lorem81         lorem83

```

## Usage

```JavaScript
var LineConf = require('line-conf');
lineConf = LineConf();
lineConf.define(['value1', 'value2', 'value3']);
lineConf.setConf('./fixture/lorem.conf');
lineConf.get('value1', 'lorem11', function(err, result) {
    // result should be
    {
        value1: 'lorem11',
        value2: 'lorem12',
        value3: 'lorem13'
    }
});

```
Also can use like
```
var LineConf = require('line-conf');
lineConf = LineConf({
    keys: ['value1', 'value2', 'value3'],
    conf: './fixture/lorem.conf'
});

```

## License

(The MIT License)

Copyright (c) 2014 xeodou <xeodou@gmail.com> (http://xeodou.me)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
