# HOW TO USE

## Object Creation

```javascript
var jsDB = new db("prefix");
```

## Adding Data

```javascript
jsDB.add("username", "admin");
```

## Getting Data

```javascript
jsDB.get("username");
```

## Removing Data

```javascript
jsDB.remove("username");
```


## Query

Data Selection :
```javascript
jsDB.query("SELECT username FROM prefix");
```

SELECT = Select operator.
username = Name of the element in local storage.
FROM = operator specifying which name prefix to select.
prefix = The prefix we set when creating the object.
