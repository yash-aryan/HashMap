'use strict';

function HashMapFactory() {
	const hashMap = Array(16),
		loadFactor = 0.75;
	let totalKeys = 0;

	function setEntry(inputKey, inputValue) {
		// Sets entry by using the hashed key as index for the hash map.
		if (typeof inputKey !== 'string') throw Error('Key must be a string!');

		// Every bucket is a linked list.
		const bucket = { key: inputKey, value: inputValue, next: null };
		const hashCode = hash(inputKey);
		if (hashCode < 0 || hashCode >= hashMap.length) {
			throw new Error('Trying to access index out of bound');
		}

		const oldBucket = hashMap[hashCode];
		if (!oldBucket) {
			// Simply fill the bucket. No Collision
			hashMap[hashCode] = bucket;
			totalKeys++;
		} else if (oldBucket.key === inputKey) {
			// Overwrites old value.
			oldBucket.value = inputValue;
		} else {
			// Appends to ".next" pointer.
			appendToList(oldBucket, bucket);
			totalKeys++;
		}

		// Grows the hash map if current load surpasses the load factor (75%);
		if (getCurrentLoad() > loadFactor) growHashMap();
	}

	function getValue(inputKey) {
		// Returns value from the hash map, else return null.
		if (typeof inputKey !== 'string') throw Error('Key must be a string!');

		const hashCode = hash(inputKey),
			bucket = hashMap[hashCode];

		if (!bucket) return null;
		return getValueFromList(bucket);

		function getValueFromList(node) {
			// Return value by traversing the linked list.
			if (!node) return null;
			if (node.key === inputKey) return node.value;
			return getValueFromList(node.next);
		}
	}

	function hasEntry(inputKey) {
		if (typeof inputKey !== 'string') throw Error('Key must be a string!');

		if (getValue(inputKey)) return true;
		return false;
	}

	function removeEntry(inputKey) {
		// Removes entry if found and returns true, else returns false.
		if (typeof inputKey !== 'string') throw Error('Key must be a string!');

		const hashCode = hash(inputKey),
			head = hashMap[hashCode];

		if (!head) return false;
		let prevNode = head;
		return traverseList(head);

		function traverseList(node) {
			// Removes entry node from linked list, returns true or false.
			if (!node) return false;

			if (node.key === inputKey) {
				if (node === head) hashMap[hashCode] = head.next;
				else prevNode.next = node.next;
				return true;
			} else {
				prevNode = node;
				return traverseList(node.next);
			}
		}
	}

	function getLength() {
		return totalKeys;
	}

	function getAllKeys() {
		return getAllFilledNodes(bucket => bucket.key);
	}

	function getAllEntries() {
		return getAllFilledNodes(bucket => [bucket.key, bucket.value]);
	}

	function clearAll() {
		hashMap.length = 0;
		hashMap.length = 16;
		totalKeys = 0;
	}

	// Private Functions
	function hash(inputStr) {
		// Returns a hash number after parsing through all char of input string.
		// This hash number is converted to be able fit in the hash map using modulo operator.

		const primeNumber = 31;
		let hashCode = 0;

		for (let i = 0; i < inputStr.length; i++) {
			hashCode = primeNumber * hashCode + inputStr.charCodeAt(i);
		}

		return hashCode % hashMap.length;
	}

	function getCurrentLoad() {
		return (totalKeys / hashMap.length).toFixed(2);
	}

	function growHashMap() {
		// Grows the hash map by doubling it's size.
		hashMap.length = hashMap.length * 2;
	}

	function appendToList(start, inputVal) {
		// Recursively finds null next pointer, then sets the input value.
		if (!start.next) start.next = inputVal;
		else appendToList(start.next, inputVal);
	}

	function getAllFilledNodes(format = node => node) {
		const keys = [];
		hashMap.forEach(bucket => {
			if (!bucket) return;

			if (bucket.next) traverseList(bucket);
			else keys.push(format(bucket));
		});

		return keys;

		function traverseList(node) {
			if (!node) return;
			keys.push(format(node));
			traverseList(node.next);
		}
	}

	return {
		setEntry,
		getValue,
		hasEntry,
		removeEntry,
		getLength,
		getAllKeys,
		getAllEntries,
		clearAll,
	};
}
