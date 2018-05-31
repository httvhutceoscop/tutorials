```
Array.prototype.in_array = function (val) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] == val) {
            return true;
        }
    }
    return false;
};
```