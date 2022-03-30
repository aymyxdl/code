import {foo, bar} from './math';
import data from '../data/test.json';

// 这里直接引用就行，无需配置变量
// 但是这里用了css文件，webpack默认是不支持的
// 所有需要使用loader进行转换
import '../css/test.css';

document.write('entry js' + '<br />');
document.write(foo(3) + '<br />');
document.write(bar(3) + '<br />');
document.write(JSON.stringify(data) + '<br />');