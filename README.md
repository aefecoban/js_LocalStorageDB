# HOW TO USE

## Object Creation

```javascript
var jsDB = new classDB("prefix");
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

Data Insert :
```javascript
jsDB.query("INSERT INTO username (value) VALUES (It's my username)");
```

INSERT INTO = Insert operator.
username = Name of the element in local storage.
(It's my username) = The data to be added must be written in parentheses. (It is only sensitive to the first and last parentheses so you can write other parentheses in data.)
