## node.js的buffer类练习
JavaScript语言本身没有连续二进制数据类型。因此，在Node.js内核中，定义了一个Buffer类，专门用于存放二进制数据的缓存区。
***
### 创建Buffer类
- 方法1. 创建长度为10字节的Buffer

    var buf = new Buffer(10);

- 方法2. 通过给定的数组创建Buffer实例

    var buf = new Buffer([10,20,30,40]);

- 方法3. 通过一个字符串来创建Buffer实例

    
