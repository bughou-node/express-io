# nodejs编码规范

## 基本规范

### 1. 所有代码文件使用 utf-8 编码
 请设置你的编辑器(Sublime, Vim等)的默认文件编码格式为utf-8
### 2. 所有代码文件的权限位为664，可执行脚本权限位为775
 请设置Samba和编辑器(Sublime等)，确保你创建的文件的权限位正确，并且确保在你保存文件时不会修改原有的权限位。
```
# 在 /etc/smb.conf 文件的 global 小节如下配置，确保Samba不会擅自修改文件权限位
[global]
   create mask = 664
   map archive = no
   map system = no
   map hidden = no
```
 Sublime3 编辑器默认使用原子保存，在保存Samba上的文件时，可能会丢失文件权限，请加如下配置，禁用原子保存
```
"atomic_save": false
```

### 3. 所有代码文件使用 unix 格式的换行符(\n)
 禁止使用windows格式的的换行符(\r\n)，请设置你的编辑器(Sublime, Vim等)的默认换行格式为unix格式
### 4. 所有代码使用2个空格缩进，禁止使用tab制表符


## 数量限制 硬指标

### 1. 每行代码不超过80个字符
  是的，现在的大屏幕一行肯定不止显示80个字符。
  但是你的眼睛和大脑的最佳横向阅读长度不会超过80个字符。
  大屏幕的额外空间，可以用编辑器的“分屏”来利用，而不至于浪费掉。

### 2. 每个函数的参数个数不超过6个
 如果一个函数的个数，超过了6个，请自我反省代码设计是否合理。

### 3. 每个函数不超过30行
 优秀的程序员通常不会让一个函数超过20行。个别逻辑耦合非常高的情况，放宽到30行。

 如果一个函数超过了30行，一定是你把本该拆分的功能揉在了一起。
 必须把它们拆分成多个函数，如果实在不知道如何拆分，问问同事该怎么拆分。

### 4. 每个文件不超过300行
 参考第3条，也就是一个文件大概10多个函数的样子。
 如果一个文件放了太多的函数，超过了300行，请按照功能相关性，把它们拆分成多个文件。

### 5. 每个目录下的文件不超过30个
 如果一个目录下有超过30个文件， 请按照功能相关性，把它们拆分到多个目录。

 

## 命名规范

### 1. 变量、属性、函数名 使用全小写加下划线形式命名

```javascript
var user_name;
```
### 2. 类、构造函数使用驼峰形式（所有单词首字母大写）命名
 因为类、构造函数会创建它们的实例，所以类、构造函数用驼峰形式命名，它们的使用用小写加下划线形式命名。

```javascript
function User() {
}
var user = new User();
```

### 3. 常量使用全大写命名
```javascript
var SECONDS_OF_DAY = 24 * 60 * 60;
```




## 代码中的空格
### 1. 所有二元运算符和三元运算符两边都应加上一个空格

```javascript
//Right:
var a = b + c;
var a = b ? c : d;

//Wrong:
var a = b+c;
var a = b?c:d;
```

### 2. 所有关键字和花括弧的左右如果不是空白，应加一个空格
 
```javascript
//Right:
if (true) {
  console.log('something');
} else {
  console.log('other things');
}
for (var i = 0; i < 10; i++) {
}

//Wrong:
if(true){
  console.log('something');
}else{
  console.log('other things');
}
//Wrong:
for(var i = 0; i < 10; i++){
}
```

### 3. 逗号、冒号、分号后如果不是空白，应加一个空格
```javascript
//Right:
var o = { a: 1, b: 2 };

//Wrong:
var o = { a:1,b:2 };
//Wrong:
for(var i = 0;i < 10;i++) {
}
```
### 4. 行尾不应有空格

```javascript
var such = function(name, password) {
  if (name === 'name') {
    var user = {
      username: name,
      password: password
    };
    console.log(user + 'is right');
  }
}
```

## 其他

### 1. 所有语句结束都要加分号，函数声明语句除外
```javascript
//Right:
function test() {
}
var test = function() {
};

//Wrong:
function test() {
};
var test = function() {
}
```

### 2. 尽量使用单引号；字符串内有单引号时，使用双引号
```javascript
//Right:
var a = 'no single quote string';
var b = "has ' single quote string";

//Wrong:
var a = "no single quote string";
var b = 'has \' single quote string';
```


### 3. 左大括号前不要换行
```javascript
//Right:
if (true) {
  console.log('winning');
}
//Wrong:
if (true)
{
console.log('losing');
}
```

### 4. 除非你有确切的理由，否则一律使用 === 和 !== 操作符， 而不是 == 和 !=

```javascript
//Right:
var a = 0;
if (a !== '') {
  console.log('this is true');
}
//Wrong:
var a = 0;
if (a != '') {
  console.log('this is false');
}
```

### 5. 避免深度嵌套的 if 语句，尽早从函数中返回

```javascript
//Right:
function isPercentage(val) {
  if (val < 0) {
    return false;
  }

  if (val > 100) {
    return false;
  }

  return true;
}
//Wrong:
function isPercentage(val) {
  if (val >= 0) {
    if (val < 100) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```


# 严格遵守以上所有的编码规范，你已经成功了一半。

注：请使用markdown阅读器，阅读本文档。更美观，并且有内容层级目录。 

在chrome浏览器安装 Markdown Viewer插件，并且设置选项允许访问文件地址，然后用chrome打开本文档即可。

