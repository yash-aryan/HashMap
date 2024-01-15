# Overview

-   In this practice project, I tried creating a working HashMap Data Structure manually.
-   The hash function returns a hash number after parsing through all char of input string and multiplying a prime number to it's char code.
-   The hash number is also converted to be able fit in the hash map using modulo operator.
-   Intial Size of Hash Map = 16, but the size doubles each time current load surpasses the load factor (0.75).
-   Each element/bucket of the hash map is a linked list, in case of collisions.
-   Hash Map contains following methods:
    -   `setEntry(key)`
    -   `getValue(key)`
    -   `hasEntry(key)`
    -   `removeEntry(key)`
    -   `getLength()`
    -   `getAllKeys()`
    -   `getAllEntries()`
    -   `clearAll()`

# Usage

-   Get value using it's key

```js
// Assigns Hash Map Object to 'map' variable.
const map = HashMapFactory();

// Sets the key & value in the hash map internally.
map.setEntry('fruit', 'banana');

map.hasEntry('fruit');
> true

map.getValue('fruit');
> 'banana'
```

-   Overwrite old value of existing key

```js
const map = HashMapFactory();
map.setEntry('animal', 'tiger');
// New value with same key overwrites.
map.setEntry('animal', 'elephant');

map.getValue('animal');
> 'elephant';
```

-   Get all keys/entries

```js
const map = HashMapFactory();
map.setEntry('animal', 'cat');
map.setEntry('age', 5);
map.setEntry('likes', 'headpats');

map.getAllKeys();
> ['animal', 'age', 'likes'] // order may be different

map.getAllEntries();
> [['animal', 'cat'], ['age', 5], ['likes', 'headpats']] // order may be different

map.getLength();
> 3
```

-   Remove any entry using it's key

```js
const map = HashMapFactory();
map.setEntry('animal', 'cat');
map.getEntry('animal');
> 'cat'

map.removeEntry('animal');
map.getEntry('animal');
> null
```

-   Full Reset

```js
const map = HashMapFactory();
map.setEntry('animal', 'cat');
map.setEntry('age', 5);
map.setEntry('likes', 'headpats');
map.getLength();
> 3

map.clearAll();
map.getLength();
> 0
map.getEntries();
> []
```
