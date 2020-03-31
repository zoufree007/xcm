# Storage

索引型持久化缓存数据结构

## Usage

```javascript
import { Storage } from '@html5/natix';
const storage = new Storage('namespace');
```

它必须指定命名空间。

## storage.set(key, value)

设置一个键值对

Native端对应名称：`SetStorageByKeyValue`

参数：

- **key** `string` 键名
- **value** `*` 值

```javascript
await storage.set('test', 'evio');
```

## storage.get(key)

获取一个键

Native端对应名称：`GetStorageByKey`

参数：

- **key** `string` 键名

```javascript
await storage.get('test');
```

## storage.delete(key)

删除一个键

Native端对应名称：`DeleteStorageByKey`

参数：

- **key** `string` 键名

```javascript
await storage.delete('test');
```

## storage.has(key)

判断是否存在某个键

Native端对应名称：`HasStorageByKey`

参数：

- **key** `string` 键名

```javascript
await storage.has('test');
```

> 注意：Native端返回`true`or`false`

## storage.scan(keyword)

搜索关键字

Native端对应名称：`ScanStorageByKeyWord`

参数：

- **keyword** `string` 关键字
- **namespace** `string` 系统自动传递本命名空间（native端自动传递）

```javascript
await storage.scan('te');
```