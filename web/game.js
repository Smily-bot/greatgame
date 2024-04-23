"use strict";
var main;
(function($rt_globals) {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    if (to.$meta.item !== null) {
        return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_castToInterface(obj, cls) {
    if (obj !== null && !$rt_isInstance(obj, cls)) {
        $rt_throwCCE();
    }
    return obj;
}
function $rt_castToClass(obj, cls) {
    if (obj !== null && !(obj instanceof cls)) {
        $rt_throwCCE();
    }
    return obj;
}
$rt_globals.Array.prototype.fill = $rt_globals.Array.prototype.fill || function(value, start, end) {
    var len = this.length;
    if (!len) return this;
    start = start | 0;
    var i = start < 0 ? $rt_globals.Math.max(len + start, 0) : $rt_globals.Math.min(start, len);
    end = end === $rt_globals.undefined ? len : end | 0;
    end = end < 0 ? $rt_globals.Math.max(len + end, 0) : $rt_globals.Math.min(end, len);
    for (;i < end;i++) {
        this[i] = value;
    }
    return this;
};
function $rt_createArray(cls, sz) {
    var data = new $rt_globals.Array(sz);
    data.fill(null);
    return new $rt_array(cls, data);
}
function $rt_createArrayFromData(cls, init) {
    return $rt_wrapArray(cls, init);
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new $rt_globals.Array(sz));
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
var $rt_createLongArray;
var $rt_createLongArrayFromData;
if (typeof $rt_globals.BigInt64Array !== 'function') {
    $rt_createLongArray = function(sz) {
        var data = new $rt_globals.Array(sz);
        var arr = new $rt_array($rt_longcls(), data);
        data.fill(Long_ZERO);
        return arr;
    };
    $rt_createLongArrayFromData = function(init) {
        return new $rt_array($rt_longcls(), init);
    };
} else {
    $rt_createLongArray = function(sz) {
        return $rt_createNumericArray($rt_longcls(), new $rt_globals.BigInt64Array(sz));
    };
    $rt_createLongArrayFromData = function(data) {
        var buffer = new $rt_globals.BigInt64Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_longcls(), buffer);
    };
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new $rt_globals.Uint16Array(sz));
}
function $rt_createCharArrayFromData(data) {
    var buffer = new $rt_globals.Uint16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_charcls(), buffer);
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new $rt_globals.Int8Array(sz));
}
function $rt_createByteArrayFromData(data) {
    var buffer = new $rt_globals.Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_bytecls(), buffer);
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new $rt_globals.Int16Array(sz));
}
function $rt_createShortArrayFromData(data) {
    var buffer = new $rt_globals.Int16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_shortcls(), buffer);
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new $rt_globals.Int32Array(sz));
}
function $rt_createIntArrayFromData(data) {
    var buffer = new $rt_globals.Int32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_intcls(), buffer);
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new $rt_globals.Int8Array(sz));
}
function $rt_createBooleanArrayFromData(data) {
    var buffer = new $rt_globals.Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_booleancls(), buffer);
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new $rt_globals.Float32Array(sz));
}
function $rt_createFloatArrayFromData(data) {
    var buffer = new $rt_globals.Float32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_floatcls(), buffer);
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new $rt_globals.Float64Array(sz));
}
function $rt_createDoubleArrayFromData(data) {
    var buffer = new $rt_globals.Float64Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_doublecls(), buffer);
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
var $rt_javaExceptionProp = $rt_globals.Symbol("javaException");
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        var javaCause = $rt_throwableCause(ex);
        var jsCause = javaCause !== null ? javaCause.$jsException : $rt_globals.undefined;
        var cause = typeof jsCause === "object" ? { cause : jsCause } : $rt_globals.undefined;
        err = new JavaError("Java exception thrown", cause);
        if (typeof $rt_globals.Error.captureStackTrace === "function") {
            $rt_globals.Error.captureStackTrace(err);
        }
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_stecls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && $rt_globals.isNaN(value)) {
        throw "NaN";
    }
    return value;
}
function $rt_createOutputFunction(printFunction) {
    var buffer = "";
    var utf8Buffer = 0;
    var utf8Remaining = 0;
    function putCodePoint(ch) {
        if (ch === 0xA) {
            printFunction(buffer);
            buffer = "";
        } else if (ch < 0x10000) {
            buffer += $rt_globals.String.fromCharCode(ch);
        } else {
            ch = ch - 0x10000 | 0;
            var hi = (ch >> 10) + 0xD800;
            var lo = (ch & 0x3FF) + 0xDC00;
            buffer += $rt_globals.String.fromCharCode(hi, lo);
        }
    }
    return function(ch) {
        if ((ch & 0x80) === 0) {
            putCodePoint(ch);
        } else if ((ch & 0xC0) === 0x80) {
            if (utf8Buffer > 0) {
                utf8Remaining <<= 6;
                utf8Remaining |= ch & 0x3F;
                if ( --utf8Buffer === 0) {
                    putCodePoint(utf8Remaining);
                }
            }
        } else if ((ch & 0xE0) === 0xC0) {
            utf8Remaining = ch & 0x1F;
            utf8Buffer = 1;
        } else if ((ch & 0xF0) === 0xE0) {
            utf8Remaining = ch & 0x0F;
            utf8Buffer = 2;
        } else if ((ch & 0xF8) === 0xF0) {
            utf8Remaining = ch & 0x07;
            utf8Buffer = 3;
        }
    };
}
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
    $rt_globals.console.info(msg);
}) : function() {
};
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
    $rt_globals.console.error(msg);
}) : function() {
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new $rt_globals.Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = $rt_globals.Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            var enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            var declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            var simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_wrapFunction0(f) {
    return function() {
        return f(this);
    };
}
function $rt_wrapFunction1(f) {
    return function(p1) {
        return f(this, p1);
    };
}
function $rt_wrapFunction2(f) {
    return function(p1, p2) {
        return f(this, p1, p2);
    };
}
function $rt_wrapFunction3(f) {
    return function(p1, p2, p3) {
        return f(this, p1, p2, p3, p3);
    };
}
function $rt_wrapFunction4(f) {
    return function(p1, p2, p3, p4) {
        return f(this, p1, p2, p3, p4);
    };
}
function $rt_threadStarter(f) {
    return function() {
        var args = $rt_globals.Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new $rt_globals.Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new $rt_globals.DataView(new $rt_globals.ArrayBuffer(8));
var $rt_doubleToLongBits;
var $rt_longBitsToDouble;
if (typeof $rt_globals.BigInt !== 'function') {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
    };
    $rt_longBitsToDouble = function(n) {
        $rt_numberConversionView.setInt32(0, n.lo, true);
        $rt_numberConversionView.setInt32(4, n.hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
} else {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        var lo = $rt_numberConversionView.getInt32(0, true);
        var hi = $rt_numberConversionView.getInt32(4, true);
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
    };
    $rt_longBitsToDouble = function(n) {
        var hi = $rt_globals.Number($rt_globals.BigInt.asIntN(32, n >> $rt_globals.BigInt(32)));
        var lo = $rt_globals.Number($rt_globals.BigInt.asIntN(32, n & $rt_globals.BigInt(0xFFFFFFFF)));
        $rt_numberConversionView.setInt32(0, lo, true);
        $rt_numberConversionView.setInt32(4, hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
var JavaError;
if (typeof $rt_globals.Reflect === 'object') {
    var defaultMessage = $rt_globals.Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        var self = $rt_globals.Reflect.construct($rt_globals.Error, [$rt_globals.undefined, cause], JavaError);
        $rt_globals.Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    };
    JavaError.prototype = $rt_globals.Object.create($rt_globals.Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get : function() {
        var javaException = this[$rt_javaExceptionProp];
        if (typeof javaException === 'object') {
            var javaMessage = $rt_throwableMessage(javaException);
            if (typeof javaMessage === "object") {
                return javaMessage.toString();
            }
        }
        return this[defaultMessage];
    } } });
} else {
    JavaError = $rt_globals.Error;
}
function $rt_javaException(e) {
    return e instanceof $rt_globals.Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
var Long_MAX_NORMAL = 1 << 18;
var Long_ZERO;
var Long_create;
var Long_fromInt;
var Long_fromNumber;
var Long_toNumber;
var Long_hi;
var Long_lo;
if (typeof $rt_globals.BigInt !== "function") {
    Long.prototype.toString = function() {
        var result = [];
        var n = this;
        var positive = Long_isPositive(n);
        if (!positive) {
            n = Long_neg(n);
        }
        var radix = new Long(10, 0);
        do  {
            var divRem = Long_divRem(n, radix);
            result.push($rt_globals.String.fromCharCode(48 + divRem[1].lo));
            n = divRem[0];
        }while (n.lo !== 0 || n.hi !== 0);
        result = (result.reverse()).join('');
        return positive ? result : "-" + result;
    };
    Long.prototype.valueOf = function() {
        return Long_toNumber(this);
    };
    Long_ZERO = new Long(0, 0);
    Long_fromInt = function(val) {
        return new Long(val,  -(val < 0) | 0);
    };
    Long_fromNumber = function(val) {
        if (val >= 0) {
            return new Long(val | 0, val / 0x100000000 | 0);
        } else {
            return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
        }
    };
    Long_create = function(lo, hi) {
        return new Long(lo, hi);
    };
    Long_toNumber = function(val) {
        return 0x100000000 * val.hi + (val.lo >>> 0);
    };
    Long_hi = function(val) {
        return val.hi;
    };
    Long_lo = function(val) {
        return val.lo;
    };
} else {
    Long_ZERO = $rt_globals.BigInt(0);
    Long_create = function(lo, hi) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
    };
    Long_fromInt = function(val) {
        return $rt_globals.BigInt(val);
    };
    Long_fromNumber = function(val) {
        return $rt_globals.BigInt(val >= 0 ? $rt_globals.Math.floor(val) : $rt_globals.Math.ceil(val));
    };
    Long_toNumber = function(val) {
        return $rt_globals.Number(val);
    };
    Long_hi = function(val) {
        return $rt_globals.Number($rt_globals.BigInt.asIntN(64, val >> $rt_globals.BigInt(32))) | 0;
    };
    Long_lo = function(val) {
        return $rt_globals.Number($rt_globals.BigInt.asIntN(32, val)) | 0;
    };
}
var $rt_imul = $rt_globals.Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    return (a >>> 0) / (b >>> 0) >>> 0;
};
var $rt_umod = function(a, b) {
    return (a >>> 0) % (b >>> 0) >>> 0;
};
function $rt_checkBounds(index, array) {
    if (index < 0 || index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkUpperBound(index, array) {
    if (index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkLowerBound(index) {
    if (index < 0) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_classWithoutFields(superclass) {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
}
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_stecls() {
    return jl_StackTraceElement;
}
function $rt_throwableMessage(t) {
    return jl_Throwable_getMessage(t);
}
function $rt_throwableCause(t) {
    return jl_Throwable_getCause(t);
}
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return jl_Thread_currentThread();
}
function $rt_setThread(t) {
    return jl_Thread_setCurrentThread(t);
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
function $rt_throwAIOOBE() {
}
function $rt_throwCCE() {
}
var $java = Object.create(null);
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
function jl_Object__init_() {
    var var_0 = new jl_Object();
    jl_Object__init_0(var_0);
    return var_0;
}
function jl_Object_monitorEnterSync($o) {
    var var$2;
    if ($o.$monitor === null)
        jl_Object_createMonitor($o);
    if ($o.$monitor.$owner === null)
        $o.$monitor.$owner = jl_Thread_currentThread();
    else if ($o.$monitor.$owner !== jl_Thread_currentThread())
        $rt_throw(jl_IllegalStateException__init_($rt_s(0)));
    var$2 = $o.$monitor;
    var$2.$count = var$2.$count + 1 | 0;
}
function jl_Object_monitorExitSync($o) {
    var var$2, var$3;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        var$2 = $o.$monitor;
        var$3 = var$2.$count - 1 | 0;
        var$2.$count = var$3;
        if (!var$3)
            $o.$monitor.$owner = null;
        jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_());
}
function jl_Object_monitorEnter($o) {
    jl_Object_monitorEnter0($o, 1);
}
function jl_Object_monitorEnter0($o, $count) {
    var var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$count = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        if ($o.$monitor.$owner === null)
            $o.$monitor.$owner = jl_Thread_currentThread();
        if ($o.$monitor.$owner === jl_Thread_currentThread()) {
            var$3 = $o.$monitor;
            var$3.$count = var$3.$count + $count | 0;
            return;
        }
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait($o, $count);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, $count, var$3, $ptr);
}
function jl_Object_createMonitor($o) {
    $o.$monitor = jl_Object$Monitor__init_();
}
function jl_Object_monitorEnterWait(var$1, var$2) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Object_monitorEnterWait0(var$1, var$2, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Object_monitorEnterWait0($o, $count, $callback) {
    var $thread_0, var$5, $monitor;
    $thread_0 = jl_Thread_currentThread();
    if ($o.$monitor === null) {
        jl_Object_createMonitor($o);
        jl_Thread_setCurrentThread($thread_0);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    if ($o.$monitor.$owner === null) {
        $o.$monitor.$owner = $thread_0;
        jl_Thread_setCurrentThread($thread_0);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    $monitor = $o.$monitor;
    if ($monitor.$enteringThreads === null)
        $monitor.$enteringThreads = otp_Platform_createQueue();
    otp_PlatformQueue_add$static($monitor.$enteringThreads, jl_Object$monitorEnterWait$lambda$_6_0__init_($thread_0, $o, $count, $callback));
}
function jl_Object_monitorExit($o) {
    jl_Object_monitorExit0($o, 1);
}
function jl_Object_monitorExit0($o, $count) {
    var $monitor;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        $monitor = $o.$monitor;
        $monitor.$count = $monitor.$count - $count | 0;
        if ($monitor.$count > 0)
            return;
        $monitor.$owner = null;
        if ($monitor.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static($monitor.$enteringThreads))
            otp_Platform_postpone(jl_Object$monitorExit$lambda$_8_0__init_($o));
        else
            jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_());
}
function jl_Object_waitForOtherThreads($o) {
    var $monitor, $enteringThreads, $r;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === null) {
        $monitor = $o.$monitor;
        if ($monitor.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static($monitor.$enteringThreads)) {
            $enteringThreads = $monitor.$enteringThreads;
            $r = otp_PlatformQueue_remove$static($enteringThreads);
            $monitor.$enteringThreads = null;
            $r.$run();
        }
        return;
    }
}
function jl_Object_isEmptyMonitor($this) {
    var $monitor, var$2;
    $monitor = $this.$monitor;
    if ($monitor === null)
        return 1;
    a: {
        b: {
            if ($monitor.$owner === null) {
                if ($monitor.$enteringThreads !== null) {
                    var$2 = $monitor.$enteringThreads;
                    if (!otp_PlatformQueue_isEmpty$static(var$2))
                        break b;
                }
                if ($monitor.$notifyListeners === null)
                    break a;
                var$2 = $monitor.$notifyListeners;
                if (otp_PlatformQueue_isEmpty$static(var$2))
                    break a;
            }
        }
        return 0;
    }
    jl_Object_deleteMonitor($this);
    return 1;
}
function jl_Object_deleteMonitor($this) {
    $this.$monitor = null;
}
function jl_Object_holdsLock($o) {
    return $o.$monitor !== null && $o.$monitor.$owner === jl_Thread_currentThread() ? 1 : 0;
}
function jl_Object__init_0($this) {}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_hashCode($this) {
    return jl_Object_identity($this);
}
function jl_Object_equals($this, $other) {
    return $this !== $other ? 0 : 1;
}
function jl_Object_toString($this) {
    var var$1, var$2, var$3;
    var$1 = (jl_Object_getClass($this)).$getName();
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, var$1), 64), var$2);
    return jl_StringBuilder_toString(var$3);
}
function jl_Object_identity($this) {
    var $platformThis, var$2;
    $platformThis = $this;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return $this.$id$;
}
function jl_Object_clone($this) {
    var var$1, $result, var$3;
    if (!$rt_isInstance($this, jl_Cloneable)) {
        var$1 = $this;
        if (var$1.constructor.$meta.item === null)
            $rt_throw(jl_CloneNotSupportedException__init_());
    }
    $result = otp_Platform_clone($this);
    var$1 = $result;
    var$3 = $rt_nextId();
    var$1.$id$ = var$3;
    return $result;
}
function jl_Object_notify($this) {
    var $listeners, $listener;
    if (!jl_Object_holdsLock($this))
        $rt_throw(jl_IllegalMonitorStateException__init_());
    $listeners = $this.$monitor.$notifyListeners;
    if ($listeners === null)
        return;
    a: {
        while (true) {
            if (otp_PlatformQueue_isEmpty$static($listeners))
                break a;
            $listener = otp_PlatformQueue_remove$static($listeners);
            if (!$listener.$expired())
                break;
        }
        otp_Platform_postpone($listener);
    }
    if (otp_PlatformQueue_isEmpty$static($listeners))
        $this.$monitor.$notifyListeners = null;
}
function jl_Object_notifyAll($this) {
    var $listeners, $listener;
    if (!jl_Object_holdsLock($this))
        $rt_throw(jl_IllegalMonitorStateException__init_());
    $listeners = $this.$monitor.$notifyListeners;
    if ($listeners === null)
        return;
    while (!otp_PlatformQueue_isEmpty$static($listeners)) {
        $listener = otp_PlatformQueue_remove$static($listeners);
        if (!$listener.$expired())
            otp_Platform_postpone($listener);
    }
    $this.$monitor.$notifyListeners = null;
}
function jl_Object_wait($this, $timeout) {
    var var$2, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$timeout = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        try {
            var$2 = 0;
            $ptr = 1;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
            } else {
                throw $$e;
            }
        }
        $rt_throw(jl_InterruptedException__init_());
    case 1:
        a: {
            try {
                jl_Object_wait0($this, $timeout, var$2);
                if ($rt_suspending()) {
                    break main;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return;
        }
        $rt_throw(jl_InterruptedException__init_());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $timeout, var$2, $ptr);
}
function jl_Object_wait0($this, $timeout, $nanos) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$nanos = $thread.pop();$timeout = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!jl_Object_holdsLock($this))
            $rt_throw(jl_IllegalMonitorStateException__init_());
        $ptr = 1;
    case 1:
        jl_Object_waitImpl($this, $timeout, $nanos);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $timeout, $nanos, $ptr);
}
function jl_Object_waitImpl(var$0, var$1, var$2) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Object_waitImpl0(var$0, var$1, var$2, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Object_waitImpl0($this, $timeout, $nanos, $callback) {
    var $monitor, $listener, $timeoutToSchedule;
    $monitor = $this.$monitor;
    $listener = jl_Object$NotifyListenerImpl__init_($this, $callback, $monitor.$count);
    if ($monitor.$notifyListeners === null)
        $monitor.$notifyListeners = otp_Platform_createQueue();
    otp_PlatformQueue_add$static($monitor.$notifyListeners, $listener);
    (jl_Thread_currentThread()).$interruptHandler = $listener;
    if (!(Long_le($timeout, Long_ZERO) && $nanos <= 0)) {
        $timeoutToSchedule = Long_lt($timeout, Long_fromInt(2147483647)) ? Long_lo($timeout) : 2147483647;
        $listener.$timerId = otp_Platform_schedule($listener, $timeoutToSchedule);
    }
    jl_Object_monitorExit0($this, $monitor.$count);
}
function jl_Object_wait1($this) {
    var var$1, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        try {
            var$1 = Long_ZERO;
            $ptr = 1;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
            } else {
                throw $$e;
            }
        }
        $rt_throw(jl_InterruptedException__init_());
    case 1:
        a: {
            try {
                jl_Object_wait($this, var$1);
                if ($rt_suspending()) {
                    break main;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return;
        }
        $rt_throw(jl_InterruptedException__init_());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function jl_Object_lambda$monitorExit$2($o) {
    jl_Object_waitForOtherThreads($o);
}
function jl_Object_lambda$monitorEnterWait$0($thread_0, $o, $count, $callback) {
    var var$5;
    jl_Thread_setCurrentThread($thread_0);
    $o.$monitor.$owner = $thread_0;
    var$5 = $o.$monitor;
    var$5.$count = var$5.$count + $count | 0;
    $callback.$complete(null);
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$stackTrace = null;
}
function jl_Throwable__init_() {
    var var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
}
function jl_Throwable__init_1(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_2(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_3(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_4(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
}
function jl_Throwable__init_2($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
}
function jl_Throwable__init_4($this, $cause) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$cause = $cause;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
function jl_Throwable_getMessage($this) {
    return $this.$message;
}
function jl_Throwable_getLocalizedMessage($this) {
    return $this.$getMessage();
}
function jl_Throwable_getCause($this) {
    return $this.$cause === $this ? null : $this.$cause;
}
function jl_Throwable_printStackTrace($this) {
    $this.$printStackTrace(jl_System_err());
}
function jl_Throwable_printStackTrace0($this, $stream) {
    var $message, var$3, var$4, var$5, var$6, $element;
    $stream.$print((jl_Object_getClass($this)).$getName());
    $message = $this.$getLocalizedMessage();
    if ($message !== null) {
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(1)), $message);
        $stream.$print(jl_StringBuilder_toString(var$3));
    }
    a: {
        $stream.$println();
        if ($this.$stackTrace !== null) {
            var$4 = $this.$stackTrace.data;
            var$5 = var$4.length;
            var$6 = 0;
            while (true) {
                if (var$6 >= var$5)
                    break a;
                $element = var$4[var$6];
                $stream.$print($rt_s(2));
                $stream.$println0($element);
                var$6 = var$6 + 1 | 0;
            }
        }
    }
    if ($this.$cause !== null && $this.$cause !== $this) {
        $stream.$print($rt_s(3));
        $this.$cause.$printStackTrace($stream);
    }
}
var jl_Exception = $rt_classWithoutFields(jl_Throwable);
function jl_Exception__init_() {
    var var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
}
function jl_Exception__init_1(var_0) {
    var var_1 = new jl_Exception();
    jl_Exception__init_2(var_1, var_0);
    return var_1;
}
function jl_Exception__init_0($this) {
    jl_Throwable__init_0($this);
}
function jl_Exception__init_2($this, $message) {
    jl_Throwable__init_2($this, $message);
}
var jl_RuntimeException = $rt_classWithoutFields(jl_Exception);
function jl_RuntimeException__init_0() {
    var var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_1(var_0);
    return var_0;
}
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_2(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_1($this) {
    jl_Exception__init_0($this);
}
function jl_RuntimeException__init_2($this, $message) {
    jl_Exception__init_2($this, $message);
}
var jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException);
function jl_IndexOutOfBoundsException__init_() {
    var var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_IndexOutOfBoundsException__init_1(var_0) {
    var var_1 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_2(var_1, var_0);
    return var_1;
}
function jl_IndexOutOfBoundsException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jl_IndexOutOfBoundsException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
var gp_GreenfootUtilDelegate = $rt_classWithoutFields(0);
var gj_GreenfootUtilJsDelegate = $rt_classWithoutFields();
function gj_GreenfootUtilJsDelegate__init_() {
    var var_0 = new gj_GreenfootUtilJsDelegate();
    gj_GreenfootUtilJsDelegate__init_0(var_0);
    return var_0;
}
function gj_GreenfootUtilJsDelegate__init_0($this) {
    jl_Object__init_0($this);
}
function gj_GreenfootUtilJsDelegate_getGreenfootLogoPath($this) {
    return $rt_s(4);
}
var jl_AutoCloseable = $rt_classWithoutFields(0);
var ji_Closeable = $rt_classWithoutFields(0);
var ji_InputStream = $rt_classWithoutFields();
function ji_InputStream__init_($this) {
    jl_Object__init_0($this);
}
function ji_InputStream_read($this, $b) {
    return $this.$read($b, 0, $b.data.length);
}
function ji_FilterInputStream() {
    ji_InputStream.call(this);
    this.$in = null;
}
function ji_FilterInputStream__init_(var_0) {
    var var_1 = new ji_FilterInputStream();
    ji_FilterInputStream__init_0(var_1, var_0);
    return var_1;
}
function ji_FilterInputStream__init_0($this, $in) {
    ji_InputStream__init_($this);
    $this.$in = $in;
}
function ji_BufferedInputStream() {
    var a = this; ji_FilterInputStream.call(a);
    a.$buf = null;
    a.$count0 = 0;
    a.$marklimit = 0;
    a.$markpos = 0;
    a.$pos = 0;
}
function ji_BufferedInputStream__init_(var_0) {
    var var_1 = new ji_BufferedInputStream();
    ji_BufferedInputStream__init_0(var_1, var_0);
    return var_1;
}
function ji_BufferedInputStream__init_0($this, $in) {
    ji_FilterInputStream__init_0($this, $in);
    $this.$markpos = (-1);
    $this.$buf = $rt_createByteArray(8192);
}
function ji_BufferedInputStream_fillbuf($this, $localIn, $localBuf) {
    var var$3, var$4, var$5, $newLength, $newbuf, $bytesread, $result;
    if ($this.$markpos != (-1) && ($this.$pos - $this.$markpos | 0) < $this.$marklimit) {
        a: {
            if (!$this.$markpos) {
                var$3 = $localBuf.data;
                var$4 = $this.$marklimit;
                var$5 = var$3.length;
                if (var$4 > var$5) {
                    $newLength = var$5 * 2 | 0;
                    if ($newLength > $this.$marklimit)
                        $newLength = $this.$marklimit;
                    $newbuf = $rt_createByteArray($newLength);
                    jl_System_arraycopy($localBuf, 0, $newbuf, 0, var$5);
                    $this.$buf = $newbuf;
                    $localBuf = $this.$buf;
                    break a;
                }
            }
            if ($this.$markpos > 0) {
                var$3 = $localBuf.data;
                jl_System_arraycopy($localBuf, $this.$markpos, $localBuf, 0, var$3.length - $this.$markpos | 0);
            }
        }
        var$3 = $localBuf.data;
        $this.$pos = $this.$pos - $this.$markpos | 0;
        $this.$count0 = 0;
        $this.$markpos = 0;
        $bytesread = $localIn.$read($localBuf, $this.$pos, var$3.length - $this.$pos | 0);
        $this.$count0 = $bytesread <= 0 ? $this.$pos : $this.$pos + $bytesread | 0;
        return $bytesread;
    }
    $result = $localIn.$read0($localBuf);
    if ($result > 0) {
        $this.$markpos = (-1);
        $this.$pos = 0;
        $this.$count0 = $result;
    }
    return $result;
}
function ji_BufferedInputStream_read($this) {
    var $localBuf, $localIn, var$3, var$4;
    jl_Object_monitorEnterSync($this);
    try {
        $localBuf = $this.$buf;
        $localIn = $this.$in;
        if ($localBuf !== null && $localIn !== null) {
            if ($this.$pos >= $this.$count0 && ji_BufferedInputStream_fillbuf($this, $localIn, $localBuf) == (-1))
                return (-1);
            if ($localBuf !== $this.$buf) {
                $localBuf = $this.$buf;
                if ($localBuf === null)
                    $rt_throw(ji_IOException__init_($rt_s(5)));
            }
            if (($this.$count0 - $this.$pos | 0) <= 0)
                return (-1);
            var$3 = $localBuf.data;
            var$4 = $this.$pos;
            $this.$pos = var$4 + 1 | 0;
            return var$3[var$4] & 255;
        }
        $rt_throw(ji_IOException__init_($rt_s(5)));
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
var ju_Enumeration = $rt_classWithoutFields(0);
var jl_Runnable = $rt_classWithoutFields(0);
function gj_MouseManager$handleTouchEvent$lambda$_11_0() {
    var a = this; jl_Object.call(a);
    a.$_0 = null;
    a.$_1 = null;
    a.$_2 = null;
}
function gj_MouseManager$handleTouchEvent$lambda$_11_0__init_(var_0, var_1, var_2) {
    var var_3 = new gj_MouseManager$handleTouchEvent$lambda$_11_0();
    gj_MouseManager$handleTouchEvent$lambda$_11_0__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gj_MouseManager$handleTouchEvent$lambda$_11_0__init_0(var$0, var$1, var$2, var$3) {
    jl_Object__init_0(var$0);
    var$0.$_0 = var$1;
    var$0.$_1 = var$2;
    var$0.$_2 = var$3;
}
function gj_MouseManager$handleTouchEvent$lambda$_11_0_run(var$0) {
    gj_MouseManager_lambda$handleTouchEvent$1(var$0.$_0, var$0.$_1, var$0.$_2);
}
function jnci_BufferedEncoder$Controller() {
    var a = this; jl_Object.call(a);
    a.$in0 = null;
    a.$out = null;
    a.$inPosition = 0;
    a.$outPosition = 0;
}
function jnci_BufferedEncoder$Controller__init_(var_0, var_1) {
    var var_2 = new jnci_BufferedEncoder$Controller();
    jnci_BufferedEncoder$Controller__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnci_BufferedEncoder$Controller__init_0($this, $in, $out) {
    jl_Object__init_0($this);
    $this.$in0 = $in;
    $this.$out = $out;
}
function jnci_BufferedEncoder$Controller_hasMoreInput($this) {
    return jn_Buffer_hasRemaining($this.$in0);
}
function jnci_BufferedEncoder$Controller_hasMoreOutput($this, $sz) {
    return jn_Buffer_remaining($this.$out) < $sz ? 0 : 1;
}
function jnci_BufferedEncoder$Controller_setInPosition($this, $inPosition) {
    $this.$inPosition = $inPosition;
}
function jnci_BufferedEncoder$Controller_setOutPosition($this, $outPosition) {
    $this.$outPosition = $outPosition;
}
var ji_Serializable = $rt_classWithoutFields(0);
var jl_Number = $rt_classWithoutFields();
function jl_Number__init_($this) {
    jl_Object__init_0($this);
}
var jl_Comparable = $rt_classWithoutFields(0);
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
var jl_Integer_TYPE = null;
var jl_Integer_integerCache = null;
function jl_Integer_$callClinit() {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
}
function jl_Integer__init_(var_0) {
    var var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
}
function jl_Integer__init_0($this, $value) {
    jl_Integer_$callClinit();
    jl_Number__init_($this);
    $this.$value = $value;
}
function jl_Integer_hashCode($value) {
    jl_Integer_$callClinit();
    return $value >>> 4 ^ $value << 28 ^ $value << 8 ^ $value >>> 24;
}
function jl_Integer_toHexString($i) {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
}
function jl_Integer_parseInt($s, $radix) {
    var $negative, $index, $value, var$6, $digit, var$8, var$9;
    jl_Integer_$callClinit();
    if ($radix >= 2 && $radix <= 36) {
        if ($s !== null && !$s.$isEmpty()) {
            a: {
                $negative = 0;
                $index = 0;
                switch ($s.$charAt(0)) {
                    case 43:
                        $index = 1;
                        break a;
                    case 45:
                        $negative = 1;
                        $index = 1;
                        break a;
                    default:
                }
            }
            $value = 0;
            if ($index == $s.$length())
                $rt_throw(jl_NumberFormatException__init_());
            while ($index < $s.$length()) {
                var$6 = $index + 1 | 0;
                $digit = jl_Character_getNumericValue($s.$charAt($index));
                if ($digit < 0) {
                    var$8 = new jl_NumberFormatException;
                    var$9 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(var$9, $rt_s(6)), $s);
                    jl_NumberFormatException__init_0(var$8, jl_StringBuilder_toString(var$9));
                    $rt_throw(var$8);
                }
                if ($digit >= $radix) {
                    var$8 = new jl_NumberFormatException;
                    var$9 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$9, $rt_s(7)), $radix), $rt_s(1)), $s);
                    jl_NumberFormatException__init_0(var$8, jl_StringBuilder_toString(var$9));
                    $rt_throw(var$8);
                }
                $value = $rt_imul($radix, $value) + $digit | 0;
                if ($value < 0) {
                    if (var$6 == $s.$length() && $value == (-2147483648) && $negative)
                        return (-2147483648);
                    var$8 = new jl_NumberFormatException;
                    var$9 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(var$9, $rt_s(8)), $s);
                    jl_NumberFormatException__init_0(var$8, jl_StringBuilder_toString(var$9));
                    $rt_throw(var$8);
                }
                $index = var$6;
            }
            if ($negative)
                $value =  -$value | 0;
            return $value;
        }
        $rt_throw(jl_NumberFormatException__init_1($rt_s(9)));
    }
    var$8 = new jl_NumberFormatException;
    var$9 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append(var$9, $rt_s(10)), $radix);
    jl_NumberFormatException__init_0(var$8, jl_StringBuilder_toString(var$9));
    $rt_throw(var$8);
}
function jl_Integer_parseInt0($s) {
    jl_Integer_$callClinit();
    return jl_Integer_parseInt($s, 10);
}
function jl_Integer_valueOf($i) {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_($i);
}
function jl_Integer_ensureIntegerCache() {
    var $j;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= jl_Integer_integerCache.data.length)
                    break a;
                jl_Integer_integerCache.data[$j] = jl_Integer__init_($j - 128 | 0);
                $j = $j + 1 | 0;
            }
        }
    }
}
function jl_Integer_intValue($this) {
    return $this.$value;
}
function jl_Integer_hashCode0($this) {
    return jl_Integer_hashCode($this.$value);
}
function jl_Integer_equals($this, $other) {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $other.$value == $this.$value ? 1 : 0;
}
function jl_Integer_numberOfLeadingZeros($i) {
    var $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
}
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
var jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception);
function jl_CloneNotSupportedException__init_() {
    var var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_0(var_0);
    return var_0;
}
function jl_CloneNotSupportedException__init_0($this) {
    jl_Exception__init_0($this);
}
var otj_JSObject = $rt_classWithoutFields(0);
var otjt_ArrayBufferView = $rt_classWithoutFields();
var otjt_Uint8Array = $rt_classWithoutFields(otjt_ArrayBufferView);
var jl_AbstractStringBuilder$Constants = $rt_classWithoutFields();
var jl_AbstractStringBuilder$Constants_intPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null;
var jl_AbstractStringBuilder$Constants_floatAnalysisResult = null;
function jl_AbstractStringBuilder$Constants_$callClinit() {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
}
function jl_AbstractStringBuilder$Constants__init_() {
    var var_0 = new jl_AbstractStringBuilder$Constants();
    jl_AbstractStringBuilder$Constants__init_0(var_0);
    return var_0;
}
function jl_AbstractStringBuilder$Constants__init_0($this) {
    jl_AbstractStringBuilder$Constants_$callClinit();
    jl_Object__init_0($this);
}
function jl_AbstractStringBuilder$Constants__clinit_() {
    jl_AbstractStringBuilder$Constants_intPowersOfTen = $rt_createIntArrayFromData([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]);
    jl_AbstractStringBuilder$Constants_longPowersOfTen = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(1000), Long_fromInt(10000), Long_fromInt(100000), Long_fromInt(1000000), Long_fromInt(10000000), Long_fromInt(100000000), Long_fromInt(1000000000), Long_create(1410065408, 2), Long_create(1215752192, 23), Long_create(3567587328, 232), Long_create(1316134912, 2328), Long_create(276447232, 23283), Long_create(2764472320, 232830), Long_create(1874919424, 2328306),
    Long_create(1569325056, 23283064), Long_create(2808348672, 232830643)]);
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(10000), Long_fromInt(100000000), Long_create(1874919424, 2328306)]);
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_();
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_();
}
var otp_PlatformRunnable = $rt_classWithoutFields(0);
var otr_EventQueue$Event = $rt_classWithoutFields(0);
var jl_Object$NotifyListener = $rt_classWithoutFields(0);
var otjb_TimerHandler = $rt_classWithoutFields(0);
var jl_ThreadInterruptHandler = $rt_classWithoutFields(0);
function jl_Object$NotifyListenerImpl() {
    var a = this; jl_Object.call(a);
    a.$obj = null;
    a.$callback = null;
    a.$currentThread0 = null;
    a.$timerId = 0;
    a.$expired0 = 0;
    a.$performed = 0;
    a.$lockCount = 0;
}
function jl_Object$NotifyListenerImpl__init_(var_0, var_1, var_2) {
    var var_3 = new jl_Object$NotifyListenerImpl();
    jl_Object$NotifyListenerImpl__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_Object$NotifyListenerImpl__init_0($this, $obj, $callback, $lockCount) {
    jl_Object__init_0($this);
    $this.$currentThread0 = jl_Thread_currentThread();
    $this.$timerId = (-1);
    $this.$obj = $obj;
    $this.$callback = $callback;
    $this.$lockCount = $lockCount;
}
function jl_Object$NotifyListenerImpl_expired($this) {
    var $result;
    $result = $this.$expired0;
    $this.$expired0 = 1;
    return $result;
}
function jl_Object$NotifyListenerImpl_onTimer($this) {
    otp_Platform_postpone(jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_($this));
}
function jl_Object$NotifyListenerImpl_run($this) {
    if ($this.$performed)
        return;
    $this.$performed = 1;
    if ($this.$timerId >= 0) {
        otp_Platform_killSchedule($this.$timerId);
        $this.$timerId = (-1);
    }
    jl_Thread_setCurrentThread($this.$currentThread0);
    jl_Object_monitorEnterWait0($this.$obj, $this.$lockCount, $this.$callback);
}
function jl_Object$NotifyListenerImpl_interrupted($this) {
    if ($this.$performed)
        return;
    $this.$performed = 1;
    if ($this.$timerId >= 0) {
        otp_Platform_killSchedule($this.$timerId);
        $this.$timerId = (-1);
    }
    otp_Platform_postpone(jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_($this));
}
function jl_Object$NotifyListenerImpl_lambda$interrupted$3($this) {
    $this.$callback.$error(jl_InterruptedException__init_());
}
function jl_Object$NotifyListenerImpl_lambda$onTimer$1($this) {
    if (!$this.$expired())
        $this.$run();
}
function jl_Object$NotifyListenerImpl_onTimer$exported$0(var$0) {
    var$0.$onTimer();
}
var otjdx_Node = $rt_classWithoutFields(0);
var otjdx_Document = $rt_classWithoutFields(0);
var otjde_EventTarget = $rt_classWithoutFields(0);
var otjdh_HTMLDocument = $rt_classWithoutFields(0);
function otjdh_HTMLDocument_current() {
    return $rt_globals.window.document;
}
var jl_Long = $rt_classWithoutFields(jl_Number);
var jl_Long_TYPE = null;
function jl_Long_$callClinit() {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
}
function jl_Long_divideUnsigned(var$1, var$2) {
    return Long_udiv(var$1, var$2);
}
function jl_Long_remainderUnsigned(var$1, var$2) {
    return Long_urem(var$1, var$2);
}
function jl_Long__clinit_() {
    jl_Long_TYPE = $rt_cls($rt_longcls());
}
var ju_Map = $rt_classWithoutFields(0);
function jl_Thread() {
    var a = this; jl_Object.call(a);
    a.$uncaughtExceptionHandler = null;
    a.$id = Long_ZERO;
    a.$priority = 0;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$interruptedFlag = 0;
    a.$interruptHandler = null;
    a.$name = null;
    a.$alive = 0;
    a.$target = null;
}
var jl_Thread_mainThread = null;
var jl_Thread_currentThread0 = null;
var jl_Thread_nextId = 0;
var jl_Thread_activeCount = 0;
var jl_Thread_defaultUncaughtExceptionHandler = null;
function jl_Thread_$callClinit() {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
}
function jl_Thread__init_() {
    var var_0 = new jl_Thread();
    jl_Thread__init_0(var_0);
    return var_0;
}
function jl_Thread__init_1(var_0) {
    var var_1 = new jl_Thread();
    jl_Thread__init_2(var_1, var_0);
    return var_1;
}
function jl_Thread__init_3(var_0) {
    var var_1 = new jl_Thread();
    jl_Thread__init_4(var_1, var_0);
    return var_1;
}
function jl_Thread__init_5(var_0, var_1) {
    var var_2 = new jl_Thread();
    jl_Thread__init_6(var_2, var_0, var_1);
    return var_2;
}
function jl_Thread__init_0($this) {
    jl_Thread_$callClinit();
    jl_Thread__init_6($this, null, null);
}
function jl_Thread__init_2($this, $name) {
    jl_Thread_$callClinit();
    jl_Thread__init_6($this, null, $name);
}
function jl_Thread__init_4($this, $target) {
    jl_Thread_$callClinit();
    jl_Thread__init_6($this, $target, null);
}
function jl_Thread__init_6($this, $target, $name) {
    var var$3;
    jl_Thread_$callClinit();
    jl_Object__init_0($this);
    $this.$finishedLock = jl_Object__init_();
    $this.$alive = 1;
    $this.$name = $name;
    $this.$target = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    $this.$id = Long_fromInt(var$3);
}
function jl_Thread_start($this) {
    otp_Platform_startThread(jl_Thread$start$lambda$_4_0__init_($this));
}
function jl_Thread_runThread($this) {
    var $t, var$2, var$3, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$t = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        a: {
            try {
                try {
                    jl_Thread_$callClinit();
                    jl_Thread_activeCount = jl_Thread_activeCount + 1 | 0;
                    jl_Thread_setCurrentThread($this);
                    $ptr = 1;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                    } else {
                        throw $$e;
                    }
                }
                ($this.$getUncaughtExceptionHandler()).$uncaughtException($this, $t);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;

            }
            var$3 = $this.$finishedLock;
            $ptr = 2;
            continue main;
        }
        var$2 = $this.$finishedLock;
        $ptr = 4;
        continue main;
    case 1:
        a: {
            b: {
                c: {
                    try {
                        $this.$run();
                        if ($rt_suspending()) {
                            break main;
                        }
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break c;
                        } else{
                            var$2 = $$je;
                            break b;
                        }
                    }
                    var$2 = $this.$finishedLock;
                    $ptr = 3;
                    continue main;
                }
                try {
                    ($this.$getUncaughtExceptionHandler()).$uncaughtException($this, $t);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;

                }
            }
            var$3 = $this.$finishedLock;
            $ptr = 2;
            continue main;
        }
        var$2 = $this.$finishedLock;
        $ptr = 4;
        continue main;
    case 2:
        jl_Object_monitorEnter(var$3);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                jl_Object_notifyAll($this.$finishedLock);
                jl_Object_monitorExit(var$3);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;

            }
            jl_Object_monitorExit(var$3);
            $rt_throw(var$2);
        }
        $this.$alive = 0;
        jl_Thread_activeCount = jl_Thread_activeCount - 1 | 0;
        jl_Thread_setCurrentThread(jl_Thread_mainThread);
        $rt_throw(var$2);
    case 3:
        jl_Object_monitorEnter(var$2);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                jl_Object_notifyAll($this.$finishedLock);
                jl_Object_monitorExit(var$2);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
            jl_Object_monitorExit(var$2);
            $rt_throw(var$3);
        }
        $this.$alive = 0;
        jl_Thread_activeCount = jl_Thread_activeCount - 1 | 0;
        jl_Thread_setCurrentThread(jl_Thread_mainThread);
        return;
    case 4:
        jl_Object_monitorEnter(var$2);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                jl_Object_notifyAll($this.$finishedLock);
                jl_Object_monitorExit(var$2);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
            jl_Object_monitorExit(var$2);
            $rt_throw(var$3);
        }
        $this.$alive = 0;
        jl_Thread_activeCount = jl_Thread_activeCount - 1 | 0;
        jl_Thread_setCurrentThread(jl_Thread_mainThread);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $t, var$2, var$3, $ptr);
}
function jl_Thread_setCurrentThread($thread_0) {
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread0 !== $thread_0)
        jl_Thread_currentThread0 = $thread_0;
    jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
}
function jl_Thread_run($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$target === null)
            return;
        var$1 = $this.$target;
        $ptr = 1;
    case 1:
        var$1.$run();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function jl_Thread_currentThread() {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread0;
}
function jl_Thread_interrupt($this) {
    $this.$interruptedFlag = 1;
    if ($this.$interruptHandler !== null) {
        $this.$interruptHandler.$interrupted();
        $this.$interruptHandler = null;
    }
}
function jl_Thread_interrupted() {
    var $thread_0, $result;
    jl_Thread_$callClinit();
    $thread_0 = jl_Thread_currentThread();
    $result = $thread_0.$interruptedFlag;
    $thread_0.$interruptedFlag = 0;
    return $result;
}
function jl_Thread_sleep(var$1) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Thread_sleep0(var$1, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Thread_sleep0($millis, $callback) {
    var $current, $handler, $intMillis;
    jl_Thread_$callClinit();
    $current = jl_Thread_currentThread();
    $handler = jl_Thread$SleepHandler__init_($current, $callback);
    $intMillis = Long_ge($millis, Long_fromInt(2147483647)) ? 2147483647 : Long_lo($millis);
    $handler.$scheduleId = otp_Platform_schedule($handler, $intMillis);
    $current.$interruptHandler = $handler;
}
function jl_Thread_setPriority($this, $newPriority) {
    $this.$priority = $newPriority;
}
function jl_Thread_getUncaughtExceptionHandler($this) {
    if ($this.$uncaughtExceptionHandler !== null)
        return $this.$uncaughtExceptionHandler;
    jl_Thread_$callClinit();
    return jl_Thread_defaultUncaughtExceptionHandler;
}
function jl_Thread__clinit_() {
    jl_Thread_mainThread = jl_Thread__init_1($rt_s(11));
    jl_Thread_currentThread0 = jl_Thread_mainThread;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = jl_DefaultUncaughtExceptionHandler__init_();
}
function g_Actor() {
    var a = this; jl_Object.call(a);
    a.$x = 0;
    a.$y = 0;
    a.$mySequenceNumber = 0;
    a.$lastPaintSequenceNumber = 0;
    a.$rotation = 0;
    a.$world = null;
    a.$image = null;
    a.$data = null;
    a.$boundingRect = null;
    a.$boundingXs = null;
    a.$boundingYs = null;
    a.$imageWidth = 0;
    a.$imageHeight = 0;
    a.$sleepingFor = 0;
}
var g_Actor_sequenceNumber = 0;
var g_Actor_greenfootImage = null;
var g_Actor_delegate = null;
function g_Actor_$callClinit() {
    g_Actor_$callClinit = $rt_eraseClinit(g_Actor);
    g_Actor__clinit_();
}
function g_Actor_initialise() {
    var var$1, var$2, $e, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$e = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_Actor_$callClinit();
        try {
            var$1 = new g_GreenfootImage;
            var$2 = gu_GreenfootUtil_getGreenfootLogoPath();
            $ptr = 1;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
            } else {
                throw $$e;
            }
        }
        $e.$printStackTrace0();
        (jl_System_err()).$println1($rt_s(12));
        return;
    case 1:
        a: {
            try {
                g_GreenfootImage__init_(var$1, var$2);
                if ($rt_suspending()) {
                    break main;
                }
                g_Actor_greenfootImage = var$1;
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    $e = $$je;
                } else {
                    throw $$e;
                }
            }
            $e.$printStackTrace0();
            (jl_System_err()).$println1($rt_s(12));
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$1, var$2, $e, $ptr);
}
function g_Actor__init_($this) {
    var var$1, $image, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$image = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_Actor_$callClinit();
        jl_Object__init_0($this);
        $this.$rotation = 0;
        $this.$boundingXs = $rt_createIntArray(4);
        $this.$boundingYs = $rt_createIntArray(4);
        $this.$sleepingFor = 0;
        var$1 = g_Actor_sequenceNumber;
        g_Actor_sequenceNumber = var$1 + 1 | 0;
        $this.$mySequenceNumber = var$1;
        $ptr = 1;
    case 1:
        $tmp = g_Actor_getClassImage($this);
        if ($rt_suspending()) {
            break main;
        }
        $image = $tmp;
        if ($image === null)
            $image = g_Actor_greenfootImage;
        var$3 = $image.$getCopyOnWriteClone();
        $this.$setImage(var$3);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $image, var$3, $ptr);
}
function g_Actor_getX($this) {
    g_Actor_failIfNotInWorld($this);
    return $this.$x;
}
function g_Actor_getY($this) {
    g_Actor_failIfNotInWorld($this);
    return $this.$y;
}
function g_Actor_setRotation($this, $rotation) {
    if ($rotation >= 360)
        $rotation = $rotation >= 720 ? $rotation % 360 | 0 : $rotation + (-360) | 0;
    else if ($rotation < 0)
        $rotation = $rotation >= (-360) ? $rotation + 360 | 0 : 360 + ($rotation % 360 | 0) | 0;
    if ($this.$rotation != $rotation) {
        $this.$rotation = $rotation;
        $this.$boundingRect = null;
        g_Actor_sizeChanged($this);
    }
}
function g_Actor_turnTowards($this, $x, $y) {
    var $a;
    $a = jl_Math_atan2($y - $this.$y | 0, $x - $this.$x | 0);
    $this.$setRotation(jl_Math_toDegrees($a) | 0);
}
function g_Actor_setLocation($this, $x, $y) {
    g_Actor_setLocationDrag($this, $x, $y);
}
function g_Actor_move($this, $distance) {
    var $radians, var$3, var$4, $dx, $dy;
    $radians = jl_Math_toRadians($this.$rotation);
    var$3 = jl_Math_cos($radians);
    var$4 = $distance;
    $dx = Long_lo((jl_Math_round(var$3 * var$4)));
    $dy = Long_lo((jl_Math_round(jl_Math_sin($radians) * var$4)));
    $this.$setLocation($this.$x + $dx | 0, $this.$y + $dy | 0);
}
function g_Actor_setLocationDrag($this, $x, $y) {
    var $oldX, $oldY, $dx, $dy, $i, var$8;
    if ($this.$world !== null) {
        $oldX = $this.$x;
        $oldY = $this.$y;
        if (!$this.$world.$isBounded()) {
            $this.$x = $x;
            $this.$y = $y;
        } else {
            $this.$x = g_Actor_limitValue($this, $x, $this.$world.$width);
            $this.$y = g_Actor_limitValue($this, $y, $this.$world.$height);
        }
        if (!($this.$x == $oldX && $this.$y == $oldY)) {
            a: {
                if ($this.$boundingRect !== null) {
                    $dx = $rt_imul($this.$x - $oldX | 0, $this.$world.$cellSize);
                    $dy = $rt_imul($this.$y - $oldY | 0, $this.$world.$cellSize);
                    gci_Rect_setX($this.$boundingRect, gci_Rect_getX($this.$boundingRect) + $dx | 0);
                    gci_Rect_setY($this.$boundingRect, gci_Rect_getY($this.$boundingRect) + $dy | 0);
                    $i = 0;
                    while (true) {
                        if ($i >= 4)
                            break a;
                        var$8 = $this.$boundingXs.data;
                        var$8[$i] = var$8[$i] + $dx | 0;
                        var$8 = $this.$boundingYs.data;
                        var$8[$i] = var$8[$i] + $dy | 0;
                        $i = $i + 1 | 0;
                    }
                }
            }
            g_Actor_locationChanged($this, $oldX, $oldY);
        }
    }
}
function g_Actor_limitValue($this, $v, $limit) {
    if ($v < 0)
        $v = 0;
    if ($limit <= $v)
        $v = $limit - 1 | 0;
    return $v;
}
function g_Actor_getWorld($this) {
    return $this.$world;
}
function g_Actor_addedToWorld($this, $world) {}
function g_Actor_getImage($this) {
    return $this.$image;
}
function g_Actor_setImage($this, $image) {
    var $sizeChanged;
    if ($image === null && $this.$image === null)
        return;
    $sizeChanged = 1;
    if ($image !== null) {
        if ($image.$getWidth() == $this.$imageWidth && $image.$getHeight() == $this.$imageHeight)
            $sizeChanged = 0;
        else {
            $this.$imageWidth = $image.$getWidth();
            $this.$imageHeight = $image.$getHeight();
        }
    } else {
        $sizeChanged = !$this.$imageHeight && !$this.$imageWidth ? 0 : 1;
        $this.$imageWidth = 0;
        $this.$imageHeight = 0;
    }
    $this.$image = $image;
    if ($sizeChanged) {
        $this.$boundingRect = null;
        g_Actor_sizeChanged($this);
    }
}
function g_Actor_setWorld($this, $world) {
    $this.$world = $world;
}
function g_Actor_addToWorld($this, $x, $y, $world) {
    if ($world.$isBounded()) {
        $x = g_Actor_limitValue($this, $x, $world.$getWidth());
        $y = g_Actor_limitValue($this, $y, $world.$getHeight());
    }
    $this.$x = $x;
    $this.$y = $y;
    $this.$boundingRect = null;
    $this.$setWorld($world);
    $this.$setLocation($x, $y);
}
function g_Actor_getBoundingRect($this) {
    if ($this.$boundingRect === null)
        g_Actor_calcBounds($this);
    return $this.$boundingRect;
}
function g_Actor_calcBounds($this) {
    var $w, $cellSize, var$3, var$4, $wx, $wy, $i, $minX, $maxX, $minY, $maxY, $x, $y;
    $w = $this.$getActiveWorld();
    if ($w === null)
        return;
    $cellSize = $w.$getCellSize();
    if ($this.$image === null) {
        var$3 = $rt_imul($this.$x, $cellSize);
        var$4 = $cellSize / 2 | 0;
        $wx = var$3 + var$4 | 0;
        $wy = $rt_imul($this.$y, $cellSize) + var$4 | 0;
        $this.$boundingRect = gci_Rect__init_($wx, $wy, 0, 0);
        $i = 0;
        while ($i < 4) {
            $this.$boundingXs.data[$i] = $wx;
            $this.$boundingYs.data[$i] = $wy;
            $i = $i + 1 | 0;
        }
        return;
    }
    if ($this.$rotation % 90 | 0) {
        g_Actor_getRotatedCorners($this, $this.$boundingXs, $this.$boundingYs, $cellSize);
        $minX = 2147483647;
        $maxX = (-2147483648);
        $minY = 2147483647;
        $maxY = (-2147483648);
        $i = 0;
        while ($i < 4) {
            $minX = jl_Math_min($this.$boundingXs.data[$i] - 1 | 0, $minX);
            $maxX = jl_Math_max($this.$boundingXs.data[$i] + 1 | 0, $maxX);
            $minY = jl_Math_min($this.$boundingYs.data[$i] - 1 | 0, $minY);
            $maxY = jl_Math_max($this.$boundingYs.data[$i] + 1 | 0, $maxY);
            $i = $i + 1 | 0;
        }
        $this.$boundingRect = gci_Rect__init_($minX, $minY, ($maxX - $minX | 0) + 1 | 0, ($maxY - $minY | 0) + 1 | 0);
    } else {
        if ($this.$rotation % 180 | 0) {
            var$3 = $this.$image.$getHeight();
            var$4 = $this.$image.$getWidth();
        } else {
            var$3 = $this.$image.$getWidth();
            var$4 = $this.$image.$getHeight();
        }
        $x = $rt_imul($cellSize, $this.$x) + ((($cellSize - var$3 | 0) - 1 | 0) / 2 | 0) | 0;
        $y = $rt_imul($cellSize, $this.$y) + ((($cellSize - var$4 | 0) - 1 | 0) / 2 | 0) | 0;
        $this.$boundingRect = gci_Rect__init_($x, $y, var$3, var$4);
        $this.$boundingXs.data[0] = $x;
        $this.$boundingYs.data[0] = $y;
        $this.$boundingXs.data[1] = ($x + var$3 | 0) - 1 | 0;
        $this.$boundingYs.data[1] = $y;
        $this.$boundingXs.data[2] = $this.$boundingXs.data[1];
        $this.$boundingYs.data[2] = ($y + var$4 | 0) - 1 | 0;
        $this.$boundingXs.data[3] = $x;
        $this.$boundingYs.data[3] = $this.$boundingYs.data[2];
    }
}
function g_Actor_setData($this, $o) {
    $this.$data = $o;
}
function g_Actor_getData($this) {
    return $this.$data;
}
function g_Actor_getClassImage($this) {
    var $clazz, $image, var$3, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$image = $thread.pop();$clazz = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $clazz = jl_Object_getClass($this);
        while (true) {
            if ($clazz === null) {
                g_Actor_$callClinit();
                return g_Actor_greenfootImage;
            }
            $image = null;
            try {
                $ptr = 1;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
            if (var$3 !== null)
                break;
            $clazz = $clazz.$getSuperclass();
        }
        return var$3;
    case 1:
        a: {
            try {
                $tmp = $this.$getImage($clazz);
                if ($rt_suspending()) {
                    break main;
                }
                var$3 = $tmp;
                $image = var$3;
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
        }
        while (var$3 === null) {
            $clazz = $clazz.$getSuperclass();
            if ($clazz === null) {
                g_Actor_$callClinit();
                return g_Actor_greenfootImage;
            }
            $image = null;
            try {
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
        }
        return var$3;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $clazz, $image, var$3, $ptr);
}
function g_Actor_sizeChanged($this) {
    if ($this.$world !== null)
        $this.$world.$updateObjectSize($this);
}
function g_Actor_locationChanged($this, $oldX, $oldY) {
    if ($this.$world !== null)
        $this.$world.$updateObjectLocation($this, $oldX, $oldY);
}
function g_Actor_failIfNotInWorld($this) {
    if ($this.$world !== null)
        return;
    $rt_throw(jl_IllegalStateException__init_($rt_s(13)));
}
function g_Actor_getRotatedCorners($this, $xs, $ys, $cellSize) {
    var var$4, var$5, $width, $height, $rotR, $sinR, $cosR, var$11, var$12, $xc, $yc, $i, $nx, $ny;
    var$4 = $ys.data;
    var$5 = $xs.data;
    $width = $this.$image.$getWidth();
    $height = $this.$image.$getHeight();
    var$5[0] = ( -$width | 0) / 2 | 0;
    var$5[1] = (var$5[0] + $width | 0) - 1 | 0;
    var$5[2] = var$5[1];
    var$5[3] = var$5[0];
    var$4[0] = ( -$height | 0) / 2 | 0;
    var$4[1] = var$4[0];
    var$4[2] = (var$4[1] + $height | 0) - 1 | 0;
    var$4[3] = var$4[2];
    $rotR = jl_Math_toRadians($this.$rotation);
    $sinR = jl_Math_sin($rotR);
    $cosR = jl_Math_cos($rotR);
    var$11 = $rt_imul($cellSize, $this.$x);
    var$12 = $cellSize / 2.0;
    $xc = var$11 + var$12;
    $yc = $rt_imul($cellSize, $this.$y) + var$12;
    $i = 0;
    while ($i < 4) {
        $nx = var$5[$i] * $cosR - var$4[$i] * $sinR + $xc | 0;
        $ny = var$4[$i] * $cosR + var$5[$i] * $sinR + $yc | 0;
        var$5[$i] = $nx;
        var$4[$i] = $ny;
        $i = $i + 1 | 0;
    }
}
function g_Actor_checkOutside($myX, $myY, $otherX, $otherY) {
    var $v, var$6, var$7, $v_0, $v1, $edgeX, $edgeY, $reX, $e, var$14, $scalar;
    g_Actor_$callClinit();
    $v = 0;
    while ($v < 4) {
        var$6 = $myY.data;
        var$7 = $myX.data;
        $v_0 = $v + 1 | 0;
        $v1 = $v_0 & 3;
        $edgeX = var$7[$v] - var$7[$v1] | 0;
        $edgeY = var$6[$v] - var$6[$v1] | 0;
        $reX =  -$edgeY | 0;
        if (!(!$reX && !$edgeX)) {
            $e = 0;
            while (true) {
                if ($e >= 4)
                    return 1;
                var$14 = $otherY.data;
                $scalar = $rt_imul($reX, $otherX.data[$e] - var$7[$v1] | 0) + $rt_imul($edgeX, var$14[$e] - var$6[$v1] | 0) | 0;
                if ($scalar < 0)
                    break;
                $e = $e + 1 | 0;
            }
        }
        $v = $v_0;
    }
    return 0;
}
function g_Actor_intersects($this, $other) {
    var $cellSize, var$3, var$4, $thisBounds, $otherBounds, $myX, $myY, $otherX, $otherY;
    if ($this.$image === null) {
        if ($other.$image !== null) {
            $cellSize = $this.$world.$getCellSize();
            var$3 = $rt_imul($this.$x, $cellSize);
            var$4 = $cellSize / 2 | 0;
            return $other.$containsPoint(var$3 + var$4 | 0, $rt_imul($this.$y, $cellSize) + var$4 | 0);
        }
        return $this.$x == $other.$x && $this.$y == $other.$y ? 1 : 0;
    }
    if ($other.$image === null) {
        $cellSize = $this.$world.$getCellSize();
        var$3 = $rt_imul($other.$x, $cellSize);
        var$4 = $cellSize / 2 | 0;
        return $this.$containsPoint(var$3 + var$4 | 0, $rt_imul($other.$y, $cellSize) + var$4 | 0);
    }
    $thisBounds = $this.$getBoundingRect();
    $otherBounds = $other.$getBoundingRect();
    if (!$this.$rotation && !$other.$rotation)
        return gci_Rect_intersects($thisBounds, $otherBounds);
    if (!gci_Rect_intersects($thisBounds, $otherBounds))
        return 0;
    $myX = $this.$boundingXs;
    $myY = $this.$boundingYs;
    $otherX = $other.$boundingXs;
    $otherY = $other.$boundingYs;
    if (g_Actor_checkOutside($myX, $myY, $otherX, $otherY))
        return 0;
    if (!g_Actor_checkOutside($otherX, $otherY, $myX, $myY))
        return 1;
    return 0;
}
function g_Actor_getOneIntersectingObject($this, $cls) {
    g_Actor_failIfNotInWorld($this);
    return $this.$world.$getOneIntersectingObject($this, $cls);
}
function g_Actor_isTouching($this, $cls) {
    g_Actor_failIfNotInWorld($this);
    return $this.$getOneIntersectingObject0($cls) === null ? 0 : 1;
}
function g_Actor_containsPoint($this, $px, $py) {
    var $v, $v_0, $v1, $edgeX, $edgeY, $reX, $scalar, var$10, var$11;
    g_Actor_failIfNotInWorld($this);
    if ($this.$image === null)
        return 0;
    if ($this.$boundingRect === null)
        g_Actor_calcBounds($this);
    if ($this.$rotation && $this.$rotation != 90 && $this.$rotation != 270) {
        $v = 0;
        while ($v < 4) {
            $v_0 = $v + 1 | 0;
            $v1 = $v_0 & 3;
            $edgeX = $this.$boundingXs.data[$v] - $this.$boundingXs.data[$v1] | 0;
            $edgeY = $this.$boundingYs.data[$v] - $this.$boundingYs.data[$v1] | 0;
            $reX =  -$edgeY | 0;
            if (!(!$reX && !$edgeX)) {
                $scalar = $rt_imul($reX, $px - $this.$boundingXs.data[$v1] | 0) + $rt_imul($edgeX, $py - $this.$boundingYs.data[$v1] | 0) | 0;
                if ($scalar >= 0)
                    return 0;
            }
            $v = $v_0;
        }
        return 1;
    }
    a: {
        if ($px >= gci_Rect_getX($this.$boundingRect) && $px < gci_Rect_getRight($this.$boundingRect)) {
            var$10 = $this.$boundingRect;
            if ($py >= gci_Rect_getY(var$10) && $py < gci_Rect_getTop($this.$boundingRect)) {
                var$11 = 1;
                break a;
            }
        }
        var$11 = 0;
    }
    return var$11;
}
function g_Actor_getSequenceNumber($this) {
    return $this.$mySequenceNumber;
}
function g_Actor_getSleepingFor($this) {
    return $this.$sleepingFor;
}
function g_Actor_setSleepingFor($this, $sleepingFor) {
    $this.$sleepingFor = $sleepingFor;
}
function g_Actor_getLastPaintSeqNum($this) {
    return $this.$lastPaintSequenceNumber;
}
function g_Actor_setLastPaintSeqNum($this, $num) {
    $this.$lastPaintSequenceNumber = $num;
}
function g_Actor_setDelegate($d) {
    g_Actor_$callClinit();
    g_Actor_delegate = $d;
}
function g_Actor_getDelegate() {
    g_Actor_$callClinit();
    return g_Actor_delegate;
}
function g_Actor_getImage0($this, $clazz) {
    var var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$clazz = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_Actor_$callClinit();
        var$2 = g_Actor_delegate;
        var$3 = $clazz.$getName();
        $ptr = 1;
    case 1:
        $tmp = var$2.$getImage0(var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        return var$2;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $clazz, var$2, var$3, $ptr);
}
function g_Actor_getActiveWorld($this) {
    var $handler;
    if ($this.$world !== null)
        return $this.$world;
    $handler = gc_WorldHandler_getInstance();
    if ($handler === null)
        return null;
    return $handler.$getWorld();
}
function g_Actor__clinit_() {
    g_Actor_sequenceNumber = 0;
}
var wintxt = $rt_classWithoutFields(g_Actor);
function wintxt__init_() {
    var var_0 = new wintxt();
    wintxt__init_0(var_0);
    return var_0;
}
function wintxt__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
var gj_ContentReceiver = $rt_classWithoutFields(0);
function gj_Client$getResourceBytes$lambda$_12_0() {
    var a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_10 = null;
}
function gj_Client$getResourceBytes$lambda$_12_0__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceBytes$lambda$_12_0();
    gj_Client$getResourceBytes$lambda$_12_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceBytes$lambda$_12_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_00 = var$1;
    var$0.$_10 = var$2;
}
function gj_Client$getResourceBytes$lambda$_12_0_gotContent(var$0, var$1) {
    gj_Client_lambda$getResourceBytes$8(var$0.$_00, var$0.$_10, var$1);
}
function gj_Client$getResourceBytes$lambda$_12_0_gotContent$exported$0(var$0, var$1) {
    var$0.$gotContent(var$1);
}
var gj_ErrorCallback = $rt_classWithoutFields(0);
function gj_Client$getResourceBytes$lambda$_12_1() {
    var a = this; jl_Object.call(a);
    a.$_01 = null;
    a.$_11 = null;
}
function gj_Client$getResourceBytes$lambda$_12_1__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceBytes$lambda$_12_1();
    gj_Client$getResourceBytes$lambda$_12_1__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceBytes$lambda$_12_1__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_01 = var$1;
    var$0.$_11 = var$2;
}
function gj_Client$getResourceBytes$lambda$_12_1_gotError(var$0) {
    gj_Client_lambda$getResourceBytes$9(var$0.$_01, var$0.$_11);
}
function gj_Client$getResourceBytes$lambda$_12_1_gotError$exported$0(var$0) {
    var$0.$gotError();
}
var otp_PlatformQueue = $rt_classWithoutFields();
function otp_PlatformQueue_wrap($obj) {
    return $obj;
}
function otp_PlatformQueue_isEmpty$static($this) {
    return $this.length ? 0 : 1;
}
function otp_PlatformQueue_add$static($this, $e) {
    var var$3;
    var$3 = otp_PlatformQueue_wrap($e);
    $this.push(var$3);
}
function otp_PlatformQueue_remove$static($this) {
    return $this.shift();
}
var otjde_GamepadEventTarget = $rt_classWithoutFields(0);
var jl_CharSequence = $rt_classWithoutFields(0);
var jl_Error = $rt_classWithoutFields(jl_Throwable);
function jl_Error__init_() {
    var var_0 = new jl_Error();
    jl_Error__init_0(var_0);
    return var_0;
}
function jl_Error__init_1(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_2(var_1, var_0);
    return var_1;
}
function jl_Error__init_3(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_4(var_1, var_0);
    return var_1;
}
function jl_Error__init_0($this) {
    jl_Throwable__init_0($this);
}
function jl_Error__init_2($this, $message) {
    jl_Throwable__init_2($this, $message);
}
function jl_Error__init_4($this, $cause) {
    jl_Throwable__init_4($this, $cause);
}
var jl_LinkageError = $rt_classWithoutFields(jl_Error);
function jl_LinkageError__init_() {
    var var_0 = new jl_LinkageError();
    jl_LinkageError__init_0(var_0);
    return var_0;
}
function jl_LinkageError__init_1(var_0) {
    var var_1 = new jl_LinkageError();
    jl_LinkageError__init_2(var_1, var_0);
    return var_1;
}
function jl_LinkageError__init_0($this) {
    jl_Error__init_0($this);
}
function jl_LinkageError__init_2($this, $message) {
    jl_Error__init_2($this, $message);
}
var otjde_LoadEventTarget = $rt_classWithoutFields(0);
function otjde_LoadEventTarget_listenLoad$static($this, $listener) {
    $this.addEventListener("load", otji_JS_function($listener, "handleEvent"));
}
var jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function jl_StringIndexOutOfBoundsException__init_() {
    var var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_StringIndexOutOfBoundsException__init_0($this) {
    jl_IndexOutOfBoundsException__init_0($this);
}
var otjde_EventListener = $rt_classWithoutFields(0);
function gj_TouchManager() {
    jl_Object.call(this);
    this.$mouseManager = null;
}
function gj_TouchManager__init_(var_0) {
    var var_1 = new gj_TouchManager();
    gj_TouchManager__init_0(var_1, var_0);
    return var_1;
}
function gj_TouchManager__init_0($this, $mouseManager) {
    jl_Object__init_0($this);
    $this.$mouseManager = $mouseManager;
}
function gj_TouchManager_handleEvent($this, $e) {
    $this.$mouseManager.$handleTouchEvent($e);
}
function gj_TouchManager_handleEvent0($this, var$1) {
    $this.$handleEvent(var$1);
}
function gj_TouchManager_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jn_ByteOrder() {
    jl_Object.call(this);
    this.$name0 = null;
}
var jn_ByteOrder_BIG_ENDIAN = null;
var jn_ByteOrder_LITTLE_ENDIAN = null;
function jn_ByteOrder_$callClinit() {
    jn_ByteOrder_$callClinit = $rt_eraseClinit(jn_ByteOrder);
    jn_ByteOrder__clinit_();
}
function jn_ByteOrder__init_(var_0) {
    var var_1 = new jn_ByteOrder();
    jn_ByteOrder__init_0(var_1, var_0);
    return var_1;
}
function jn_ByteOrder__init_0($this, $name) {
    jn_ByteOrder_$callClinit();
    jl_Object__init_0($this);
    $this.$name0 = $name;
}
function jn_ByteOrder__clinit_() {
    jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(14));
    jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(15));
}
var otci_Base46 = $rt_classWithoutFields();
function otci_Base46__init_() {
    var var_0 = new otci_Base46();
    otci_Base46__init_0(var_0);
    return var_0;
}
function otci_Base46__init_0($this) {
    jl_Object__init_0($this);
}
function otci_Base46_decodeUnsigned($seq) {
    var $number, $pos, var$4, var$5, $digit, $hasMore;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters0.data;
        var$5 = $seq.$pointer;
        $seq.$pointer = var$5 + 1 | 0;
        $digit = otci_Base46_decodeDigit(var$4[var$5]);
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
}
function otci_Base46_decode($seq) {
    var $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result | 0;
    return $result;
}
function otci_Base46_decodeDigit($c) {
    if ($c < 34)
        return $c - 32 | 0;
    if ($c >= 92)
        return ($c - 32 | 0) - 2 | 0;
    return ($c - 32 | 0) - 1 | 0;
}
var ji_Flushable = $rt_classWithoutFields(0);
var ji_OutputStream = $rt_classWithoutFields();
function ji_OutputStream__init_($this) {
    jl_Object__init_0($this);
}
function otcic_ConsoleOutputStream() {
    ji_OutputStream.call(this);
    this.$buffer = null;
}
function otcic_ConsoleOutputStream__init_($this) {
    ji_OutputStream__init_($this);
    $this.$buffer = $rt_createByteArray(1);
}
var otcic_StdoutOutputStream = $rt_classWithoutFields(otcic_ConsoleOutputStream);
var otcic_StdoutOutputStream_INSTANCE = null;
function otcic_StdoutOutputStream_$callClinit() {
    otcic_StdoutOutputStream_$callClinit = $rt_eraseClinit(otcic_StdoutOutputStream);
    otcic_StdoutOutputStream__clinit_();
}
function otcic_StdoutOutputStream__init_() {
    var var_0 = new otcic_StdoutOutputStream();
    otcic_StdoutOutputStream__init_0(var_0);
    return var_0;
}
function otcic_StdoutOutputStream__init_0($this) {
    otcic_StdoutOutputStream_$callClinit();
    otcic_ConsoleOutputStream__init_($this);
}
function otcic_StdoutOutputStream_write($this, $b, $off, $len) {
    otcic_Console_writeStdout($b, $off, $len);
}
function otcic_StdoutOutputStream__clinit_() {
    otcic_StdoutOutputStream_INSTANCE = otcic_StdoutOutputStream__init_();
}
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer0 = null;
    a.$length0 = 0;
}
function jl_AbstractStringBuilder__init_() {
    var var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
}
function jl_AbstractStringBuilder__init_1(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_2($this, 16);
}
function jl_AbstractStringBuilder__init_2($this, $capacity) {
    jl_Object__init_0($this);
    $this.$buffer0 = $rt_createCharArray($capacity);
}
function jl_AbstractStringBuilder_append($this, $obj) {
    return $this.$insert($this.$length0, $obj);
}
function jl_AbstractStringBuilder_append0($this, $string) {
    return $this.$insert0($this.$length0, $string);
}
function jl_AbstractStringBuilder_insert($this, $index, $string) {
    var $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(16);
        else if ($string.$isEmpty())
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$length() | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer0.data[$i + $string.$length() | 0] = $this.$buffer0.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$length() | 0;
        $i = 0;
        while ($i < $string.$length()) {
            var$4 = $this.$buffer0.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_append1($this, $value) {
    return $this.$append2($value, 10);
}
function jl_AbstractStringBuilder_append2($this, $value, $radix) {
    return $this.$insert1($this.$length0, $value, $radix);
}
function jl_AbstractStringBuilder_insert0($this, $target, $value, $radix) {
    var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($value < $radix) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer0.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer0.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = 2147483647 / $radix | 0;
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if (var$10 > $value) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (var$10 > $posLimit)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer0.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (var$10 <= 0)
                    break a;
                var$5 = $this.$buffer0.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($value / var$10 | 0, $radix);
                $value = $value % var$10 | 0;
                var$10 = var$10 / $radix | 0;
                var$11 = var$6;
            }
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_append3($this, $value) {
    return $this.$insert2($this.$length0, $value);
}
function jl_AbstractStringBuilder_insert1($this, $target, $value) {
    var var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, var$14, $pos, $i, $intDigit;
    var$3 = $rt_compare($value, 0.0);
    if (!var$3) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer0.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 48;
        var$4 = $this.$buffer0.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 46;
        $this.$buffer0.data[var$5] = 48;
        return $this;
    }
    if (!var$3) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer0.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 45;
        var$4 = $this.$buffer0.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 48;
        var$4 = $this.$buffer0.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 46;
        $this.$buffer0.data[var$3] = 48;
        return $this;
    }
    if ($rt_globals.isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer0.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 78;
        var$4 = $this.$buffer0.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 97;
        $this.$buffer0.data[var$5] = 78;
        return $this;
    }
    if (!$rt_globals.isFinite($value) ? 1 : 0) {
        if (var$3 > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$3 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer0.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer0.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 73;
        var$4 = $this.$buffer0.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 110;
        var$4 = $this.$buffer0.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 102;
        var$4 = $this.$buffer0.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer0.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 110;
        var$4 = $this.$buffer0.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer0.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 116;
        $this.$buffer0.data[var$5] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_doubleAnalysisResult;
    otcit_DoubleAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 18;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $mantissa = Long_div($mantissa, jl_AbstractStringBuilder$Constants_longPowersOfTen.data[ -$exp | 0]);
            $digits = $digits - $exp | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if (!($exp > (-100) && $exp < 100))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$3 = $sz + $digits | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$3 | 0);
    if (!$negative)
        var$14 = $target;
    else {
        var$4 = $this.$buffer0.data;
        var$14 = $target + 1 | 0;
        var$4[$target] = 45;
    }
    $pos = Long_create(1569325056, 23283064);
    $i = 0;
    while ($i < $digits) {
        if (Long_le($pos, Long_ZERO))
            $intDigit = 0;
        else {
            $intDigit = Long_lo(Long_div($mantissa, $pos));
            $mantissa = Long_rem($mantissa, $pos);
        }
        var$4 = $this.$buffer0.data;
        var$3 = var$14 + 1 | 0;
        var$4[var$14] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$14 = var$3;
        else {
            var$4 = $this.$buffer0.data;
            var$14 = var$3 + 1 | 0;
            var$4[var$3] = 46;
        }
        $pos = Long_div($pos, Long_fromInt(10));
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer0.data;
        var$3 = var$14 + 1 | 0;
        var$4[var$14] = 69;
        if ($exp >= 0)
            var$5 = var$3;
        else {
            $exp =  -$exp | 0;
            var$4 = $this.$buffer0.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 45;
        }
        if ($exp >= 100) {
            var$4 = $this.$buffer0.data;
            var$3 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 100 | 0) | 0) & 65535;
            $exp = $exp % 100 | 0;
            var$4 = $this.$buffer0.data;
            var$14 = var$3 + 1 | 0;
            var$4[var$3] = (48 + ($exp / 10 | 0) | 0) & 65535;
        } else if ($exp < 10)
            var$14 = var$5;
        else {
            var$4 = $this.$buffer0.data;
            var$14 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        $this.$buffer0.data[var$14] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
}
function jl_AbstractStringBuilder_trailingDecimalZeros($n) {
    var $zeros, $result, $bit, $i;
    $zeros = Long_fromInt(1);
    $result = 0;
    $bit = 16;
    jl_AbstractStringBuilder$Constants_$callClinit();
    $i = jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data.length - 1 | 0;
    while ($i >= 0) {
        if (Long_eq(Long_rem($n, Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i])), Long_ZERO)) {
            $result = $result | $bit;
            $zeros = Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i]);
        }
        $bit = $bit >>> 1;
        $i = $i + (-1) | 0;
    }
    return $result;
}
function jl_AbstractStringBuilder_append4($this, $c) {
    return $this.$insert3($this.$length0, $c);
}
function jl_AbstractStringBuilder_insert2($this, $index, $c) {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer0.data[$index] = $c;
    return $this;
}
function jl_AbstractStringBuilder_insert3($this, $index, $obj) {
    return $this.$insert0($index, $obj === null ? $rt_s(16) : $obj.$toString());
}
function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
    var $newLength;
    if ($this.$buffer0.data.length >= $capacity)
        return;
    $newLength = $this.$buffer0.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer0.data.length * 2 | 0, 5));
    $this.$buffer0 = ju_Arrays_copyOf($this.$buffer0, $newLength);
}
function jl_AbstractStringBuilder_toString($this) {
    return jl_String__init_0($this.$buffer0, 0, $this.$length0);
}
function jl_AbstractStringBuilder_length($this) {
    return $this.$length0;
}
function jl_AbstractStringBuilder_getChars($this, $srcBegin, $srcEnd, $dst, $dstBegin) {
    var var$5, var$6, var$7, var$8;
    if ($srcBegin > $srcEnd)
        $rt_throw(jl_IndexOutOfBoundsException__init_1($rt_s(17)));
    while ($srcBegin < $srcEnd) {
        var$5 = $dst.data;
        var$6 = $dstBegin + 1 | 0;
        var$7 = $this.$buffer0.data;
        var$8 = $srcBegin + 1 | 0;
        var$5[$dstBegin] = var$7[$srcBegin];
        $dstBegin = var$6;
        $srcBegin = var$8;
    }
}
function jl_AbstractStringBuilder_setLength($this, $newLength) {
    $this.$length0 = $newLength;
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer0.data[$end + $i | 0] = $this.$buffer0.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
}
var jl_Appendable = $rt_classWithoutFields(0);
var jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder);
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_0($this);
}
function jl_StringBuilder_append($this, $obj) {
    jl_AbstractStringBuilder_append($this, $obj);
    return $this;
}
function jl_StringBuilder_append2($this, $string) {
    jl_AbstractStringBuilder_append0($this, $string);
    return $this;
}
function jl_StringBuilder_append1($this, $value) {
    jl_AbstractStringBuilder_append1($this, $value);
    return $this;
}
function jl_StringBuilder_append3($this, $value) {
    jl_AbstractStringBuilder_append3($this, $value);
    return $this;
}
function jl_StringBuilder_append0($this, $c) {
    jl_AbstractStringBuilder_append4($this, $c);
    return $this;
}
function jl_StringBuilder_insert($this, $target, $value) {
    jl_AbstractStringBuilder_insert1($this, $target, $value);
    return $this;
}
function jl_StringBuilder_insert0($this, $index, $obj) {
    jl_AbstractStringBuilder_insert3($this, $index, $obj);
    return $this;
}
function jl_StringBuilder_insert1($this, $index, $c) {
    jl_AbstractStringBuilder_insert2($this, $index, $c);
    return $this;
}
function jl_StringBuilder_insert2($this, $index, $string) {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
}
function jl_StringBuilder_setLength($this, var$1) {
    jl_AbstractStringBuilder_setLength($this, var$1);
}
function jl_StringBuilder_getChars($this, var$1, var$2, var$3, var$4) {
    jl_AbstractStringBuilder_getChars($this, var$1, var$2, var$3, var$4);
}
function jl_StringBuilder_length($this) {
    return jl_AbstractStringBuilder_length($this);
}
function jl_StringBuilder_toString($this) {
    return jl_AbstractStringBuilder_toString($this);
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuilder_insert3($this, var$1, var$2) {
    return $this.$insert4(var$1, var$2);
}
function jl_StringBuilder_insert4($this, var$1, var$2) {
    return $this.$insert5(var$1, var$2);
}
function jl_StringBuilder_insert5($this, var$1, var$2) {
    return $this.$insert6(var$1, var$2);
}
function jl_StringBuilder_insert6($this, var$1, var$2) {
    return $this.$insert7(var$1, var$2);
}
var ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
function ju_ConcurrentModificationException__init_() {
    var var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_0(var_0);
    return var_0;
}
function ju_ConcurrentModificationException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
var ju_Hashtable$1 = $rt_classWithoutFields();
function ju_Hashtable$1__init_() {
    var var_0 = new ju_Hashtable$1();
    ju_Hashtable$1__init_0(var_0);
    return var_0;
}
function ju_Hashtable$1__init_0($this) {
    jl_Object__init_0($this);
}
var ju_Iterator = $rt_classWithoutFields(0);
var ju_Hashtable$2 = $rt_classWithoutFields();
function ju_Hashtable$2__init_() {
    var var_0 = new ju_Hashtable$2();
    ju_Hashtable$2__init_0(var_0);
    return var_0;
}
function ju_Hashtable$2__init_0($this) {
    jl_Object__init_0($this);
}
var ju_Map$Entry = $rt_classWithoutFields(0);
var jl_Cloneable = $rt_classWithoutFields(0);
function ju_MapEntry() {
    var a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
function ju_MapEntry__init_(var_0, var_1) {
    var var_2 = new ju_MapEntry();
    ju_MapEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_MapEntry__init_0($this, $theKey, $theValue) {
    jl_Object__init_0($this);
    $this.$key = $theKey;
    $this.$value0 = $theValue;
}
function ju_MapEntry_equals($this, $object) {
    var $entry, var$3, var$4;
    if ($this === $object)
        return 1;
    if (!$rt_isInstance($object, ju_Map$Entry))
        return 0;
    a: {
        b: {
            c: {
                $entry = $object;
                if ($this.$key === null) {
                    if ($entry.$getKey() !== null)
                        break c;
                } else if (!$this.$key.$equals($entry.$getKey()))
                    break c;
                if ($this.$value0 === null) {
                    if ($entry.$getValue() !== null)
                        break c;
                    break b;
                }
                var$3 = $this.$value0;
                if (var$3.$equals($entry.$getValue()))
                    break b;
            }
            var$4 = 0;
            break a;
        }
        var$4 = 1;
    }
    return var$4;
}
function ju_MapEntry_getKey($this) {
    return $this.$key;
}
function ju_MapEntry_getValue($this) {
    return $this.$value0;
}
function ju_MapEntry_hashCode($this) {
    var var$1;
    var$1 = $this.$key === null ? 0 : $this.$key.$hashCode0();
    var$1 = var$1 ^ ($this.$value0 === null ? 0 : $this.$value0.$hashCode0());
    return var$1;
}
function ju_Hashtable$Entry() {
    var a = this; ju_MapEntry.call(a);
    a.$next = null;
    a.$hashcode = 0;
}
function ju_Hashtable$Entry__init_(var_0, var_1) {
    var var_2 = new ju_Hashtable$Entry();
    ju_Hashtable$Entry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_Hashtable$Entry__init_0($this, $theKey, $theValue) {
    ju_MapEntry__init_0($this, $theKey, $theValue);
    $this.$hashcode = $theKey.$hashCode0();
}
function ju_Hashtable$Entry_getKeyHash($this) {
    return $this.$key.$hashCode0();
}
function ju_Hashtable$Entry_equalsKey($this, $aKey, $hash) {
    return $this.$hashcode == $aKey.$hashCode0() && $this.$key.$equals($aKey) ? 1 : 0;
}
var g_MouseInfoVisitor = $rt_classWithoutFields();
function g_MouseInfoVisitor__init_() {
    var var_0 = new g_MouseInfoVisitor();
    g_MouseInfoVisitor__init_0(var_0);
    return var_0;
}
function g_MouseInfoVisitor__init_0($this) {
    jl_Object__init_0($this);
}
function g_MouseInfoVisitor_setActor($info, $actor) {
    $info.$setActor($actor);
}
function g_MouseInfoVisitor_setLoc($info, $x, $y) {
    $info.$setLoc($x, $y);
}
function g_MouseInfoVisitor_setButton($info, $button) {
    $info.$setButton($button);
}
function g_MouseInfoVisitor_newMouseInfo() {
    return g_MouseInfo__init_();
}
function g_MouseInfoVisitor_setClickCount($mouseInfo, $clickCount) {
    $mouseInfo.$setClickCount($clickCount);
}
var enemy = $rt_classWithoutFields(g_Actor);
function enemy__init_() {
    var var_0 = new enemy();
    enemy__init_0(var_0);
    return var_0;
}
function enemy__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function enemy_act($this) {
    var $player;
    $player = (($this.$getWorld()).$getObjects($rt_cls(smily))).$get(0);
    $this.$turnTowards($player.$getX(), $player.$getY());
    $this.$move(4);
}
var jl_ReflectiveOperationException = $rt_classWithoutFields(jl_Exception);
function jl_ReflectiveOperationException__init_() {
    var var_0 = new jl_ReflectiveOperationException();
    jl_ReflectiveOperationException__init_0(var_0);
    return var_0;
}
function jl_ReflectiveOperationException__init_0($this) {
    jl_Exception__init_0($this);
}
var gc_CollisionQuery = $rt_classWithoutFields(0);
function gc_GOCollisionQuery() {
    var a = this; jl_Object.call(a);
    a.$cls = null;
    a.$compareObject = null;
}
function gc_GOCollisionQuery__init_() {
    var var_0 = new gc_GOCollisionQuery();
    gc_GOCollisionQuery__init_0(var_0);
    return var_0;
}
function gc_GOCollisionQuery__init_0($this) {
    jl_Object__init_0($this);
}
function gc_GOCollisionQuery_init($this, $cls, $actor) {
    $this.$cls = $cls;
    $this.$compareObject = $actor;
}
function gc_GOCollisionQuery_checkCollision($this, $other) {
    if ($this.$cls !== null && !$this.$cls.$isInstance($other))
        return 0;
    if ($this.$compareObject === null)
        return 1;
    if (!g_ActorVisitor_intersects($this.$compareObject, $other))
        return 0;
    return 1;
}
var jnc_CoderMalfunctionError = $rt_classWithoutFields(jl_Error);
function jnc_CoderMalfunctionError__init_(var_0) {
    var var_1 = new jnc_CoderMalfunctionError();
    jnc_CoderMalfunctionError__init_0(var_1, var_0);
    return var_1;
}
function jnc_CoderMalfunctionError__init_0($this, $cause) {
    jl_Error__init_4($this, $cause);
}
function gj_Client$_init_$lambda$_1_3() {
    jl_Object.call(this);
    this.$_02 = null;
}
function gj_Client$_init_$lambda$_1_3__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_3();
    gj_Client$_init_$lambda$_1_3__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_3__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_02 = var$1;
}
function gj_Client$_init_$lambda$_1_3_handleEvent(var$0, var$1) {
    gj_Client$_init_$lambda$_1_3_handleEvent0(var$0, var$1);
}
function gj_Client$_init_$lambda$_1_3_handleEvent0(var$0, var$1) {
    gj_Client_lambda$new$4(var$0.$_02, var$1);
}
function gj_Client$_init_$lambda$_1_3_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gj_Client$_init_$lambda$_1_2() {
    jl_Object.call(this);
    this.$_03 = null;
}
function gj_Client$_init_$lambda$_1_2__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_2();
    gj_Client$_init_$lambda$_1_2__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_2__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_03 = var$1;
}
function gj_Client$_init_$lambda$_1_2_handleEvent(var$0, var$1) {
    gj_Client_lambda$new$3(var$0.$_03, var$1);
}
function gj_Client$_init_$lambda$_1_2_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gj_Client$_init_$lambda$_1_1() {
    jl_Object.call(this);
    this.$_04 = null;
}
function gj_Client$_init_$lambda$_1_1__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_1();
    gj_Client$_init_$lambda$_1_1__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_1__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_04 = var$1;
}
function gj_Client$_init_$lambda$_1_1_handleEvent(var$0, var$1) {
    gj_Client_lambda$new$2(var$0.$_04, var$1);
}
function gj_Client$_init_$lambda$_1_1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gci_ActorNode() {
    var a = this; jl_Object.call(a);
    a.$actor = null;
    a.$node = null;
    a.$next0 = null;
    a.$prev = null;
    a.$mark = 0;
}
function gci_ActorNode__init_(var_0, var_1) {
    var var_2 = new gci_ActorNode();
    gci_ActorNode__init_0(var_2, var_0, var_1);
    return var_2;
}
function gci_ActorNode__init_0($this, $actor, $node) {
    var $first;
    jl_Object__init_0($this);
    $this.$actor = $actor;
    $this.$node = $node;
    $first = gci_IBSPColChecker_getNodeForActor($actor);
    $this.$next0 = $first;
    gci_IBSPColChecker_setNodeForActor($actor, $this);
    if ($this.$next0 !== null)
        $this.$next0.$prev = $this;
    $this.$mark = 1;
}
function gci_ActorNode_clearMark($this) {
    $this.$mark = 0;
}
function gci_ActorNode_mark($this) {
    $this.$mark = 1;
}
function gci_ActorNode_checkMark($this) {
    var $markVal;
    $markVal = $this.$mark;
    $this.$mark = 0;
    return $markVal;
}
function gci_ActorNode_getBSPNode($this) {
    return $this.$node;
}
function gci_ActorNode_getNext($this) {
    return $this.$next0;
}
function gci_ActorNode_remove($this) {
    gci_ActorNode_removed($this);
    gci_BSPNode_actorRemoved($this.$node, $this.$actor);
}
function gci_ActorNode_removed($this) {
    if ($this.$prev !== null)
        $this.$prev.$next0 = $this.$next0;
    else
        gci_IBSPColChecker_setNodeForActor($this.$actor, $this.$next0);
    if ($this.$next0 !== null)
        $this.$next0.$prev = $this.$prev;
}
function jn_Buffer() {
    var a = this; jl_Object.call(a);
    a.$capacity = 0;
    a.$position = 0;
    a.$limit = 0;
    a.$mark0 = 0;
}
function jn_Buffer__init_($this, $capacity) {
    jl_Object__init_0($this);
    $this.$mark0 = (-1);
    $this.$capacity = $capacity;
    $this.$limit = $capacity;
}
function jn_Buffer_position($this) {
    return $this.$position;
}
function jn_Buffer_position0($this, $newPosition) {
    var var$2, var$3, var$4;
    if ($newPosition >= 0 && $newPosition <= $this.$limit) {
        $this.$position = $newPosition;
        if ($newPosition < $this.$mark0)
            $this.$mark0 = 0;
        return $this;
    }
    var$2 = new jl_IllegalArgumentException;
    var$3 = $this.$limit;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$4, $rt_s(18)), $newPosition), $rt_s(19)), var$3), 93);
    jl_IllegalArgumentException__init_(var$2, jl_StringBuilder_toString(var$4));
    $rt_throw(var$2);
}
function jn_Buffer_clear($this) {
    $this.$position = 0;
    $this.$limit = $this.$capacity;
    $this.$mark0 = (-1);
    return $this;
}
function jn_Buffer_remaining($this) {
    return $this.$limit - $this.$position | 0;
}
function jn_Buffer_hasRemaining($this) {
    return $this.$position >= $this.$limit ? 0 : 1;
}
function g_Color() {
    var a = this; jl_Object.call(a);
    a.$r = 0;
    a.$g = 0;
    a.$b = 0;
    a.$a = 0;
}
var g_Color_WHITE = null;
var g_Color_LIGHT_GRAY = null;
var g_Color_GRAY = null;
var g_Color_DARK_GRAY = null;
var g_Color_BLACK = null;
var g_Color_RED = null;
var g_Color_PINK = null;
var g_Color_ORANGE = null;
var g_Color_YELLOW = null;
var g_Color_GREEN = null;
var g_Color_MAGENTA = null;
var g_Color_CYAN = null;
var g_Color_BLUE = null;
function g_Color_$callClinit() {
    g_Color_$callClinit = $rt_eraseClinit(g_Color);
    g_Color__clinit_();
}
function g_Color__init_(var_0, var_1, var_2) {
    var var_3 = new g_Color();
    g_Color__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_Color__init_0($this, $r, $g, $b) {
    g_Color_$callClinit();
    jl_Object__init_0($this);
    $this.$r = $r;
    $this.$g = $g;
    $this.$b = $b;
    $this.$a = 255;
}
function g_Color_getRed($this) {
    return $this.$r;
}
function g_Color_getGreen($this) {
    return $this.$g;
}
function g_Color_getAlpha($this) {
    return $this.$a;
}
function g_Color_getBlue($this) {
    return $this.$b;
}
function g_Color__clinit_() {
    g_Color_WHITE = g_Color__init_(255, 255, 255);
    g_Color_LIGHT_GRAY = g_Color__init_(192, 192, 192);
    g_Color_GRAY = g_Color__init_(128, 128, 128);
    g_Color_DARK_GRAY = g_Color__init_(64, 64, 64);
    g_Color_BLACK = g_Color__init_(0, 0, 0);
    g_Color_RED = g_Color__init_(255, 0, 0);
    g_Color_PINK = g_Color__init_(255, 175, 175);
    g_Color_ORANGE = g_Color__init_(255, 200, 0);
    g_Color_YELLOW = g_Color__init_(255, 255, 0);
    g_Color_GREEN = g_Color__init_(0, 255, 0);
    g_Color_MAGENTA = g_Color__init_(255, 0, 255);
    g_Color_CYAN = g_Color__init_(0, 255, 255);
    g_Color_BLUE = g_Color__init_(0, 0, 255);
}
function gj_Client$getResourceURL$lambda$_11_0() {
    var a = this; jl_Object.call(a);
    a.$_05 = null;
    a.$_12 = null;
}
function gj_Client$getResourceURL$lambda$_11_0__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceURL$lambda$_11_0();
    gj_Client$getResourceURL$lambda$_11_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceURL$lambda$_11_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_05 = var$1;
    var$0.$_12 = var$2;
}
function gj_Client$getResourceURL$lambda$_11_0_gotContent(var$0, var$1) {
    gj_Client_lambda$getResourceURL$6(var$0.$_05, var$0.$_12, var$1);
}
function gj_Client$getResourceURL$lambda$_11_0_gotContent$exported$0(var$0, var$1) {
    var$0.$gotContent(var$1);
}
function gj_Client$_init_$lambda$_1_0() {
    jl_Object.call(this);
    this.$_06 = null;
}
function gj_Client$_init_$lambda$_1_0__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_0();
    gj_Client$_init_$lambda$_1_0__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_06 = var$1;
}
function gj_Client$_init_$lambda$_1_0_handleEvent(var$0, var$1) {
    gj_Client$_init_$lambda$_1_0_handleEvent0(var$0, var$1);
}
function gj_Client$_init_$lambda$_1_0_handleEvent0(var$0, var$1) {
    gj_Client_lambda$new$1(var$0.$_06, var$1);
}
function gj_Client$_init_$lambda$_1_0_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gj_Client$getResourceURL$lambda$_11_1() {
    var a = this; jl_Object.call(a);
    a.$_07 = null;
    a.$_13 = null;
}
function gj_Client$getResourceURL$lambda$_11_1__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceURL$lambda$_11_1();
    gj_Client$getResourceURL$lambda$_11_1__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceURL$lambda$_11_1__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_07 = var$1;
    var$0.$_13 = var$2;
}
function gj_Client$getResourceURL$lambda$_11_1_gotError(var$0) {
    gj_Client_lambda$getResourceURL$7(var$0.$_07, var$0.$_13);
}
function gj_Client$getResourceURL$lambda$_11_1_gotError$exported$0(var$0) {
    var$0.$gotError();
}
function gci_Rect() {
    var a = this; jl_Object.call(a);
    a.$x0 = 0;
    a.$y0 = 0;
    a.$width0 = 0;
    a.$height0 = 0;
}
function gci_Rect__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new gci_Rect();
    gci_Rect__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function gci_Rect__init_0($this, $x, $y, $width, $height) {
    jl_Object__init_0($this);
    $this.$x0 = $x;
    $this.$y0 = $y;
    $this.$width0 = $width;
    $this.$height0 = $height;
}
function gci_Rect_copyFrom($this, $other) {
    $this.$x0 = $other.$x0;
    $this.$y0 = $other.$y0;
    $this.$width0 = $other.$width0;
    $this.$height0 = $other.$height0;
}
function gci_Rect_getX($this) {
    return $this.$x0;
}
function gci_Rect_getMiddleX($this) {
    return $this.$x0 + ($this.$width0 / 2 | 0) | 0;
}
function gci_Rect_getRight($this) {
    return $this.$x0 + $this.$width0 | 0;
}
function gci_Rect_getY($this) {
    return $this.$y0;
}
function gci_Rect_getMiddleY($this) {
    return $this.$y0 + ($this.$height0 / 2 | 0) | 0;
}
function gci_Rect_getTop($this) {
    return $this.$y0 + $this.$height0 | 0;
}
function gci_Rect_getWidth($this) {
    return $this.$width0;
}
function gci_Rect_getHeight($this) {
    return $this.$height0;
}
function gci_Rect_contains($this, $other) {
    return $this.$x0 <= $other.$x0 && $this.$y0 <= $other.$y0 && gci_Rect_getTop($this) >= gci_Rect_getTop($other) && gci_Rect_getRight($this) >= gci_Rect_getRight($other) ? 1 : 0;
}
function gci_Rect_getIntersection($a, $b) {
    var $a_x, $a_r, $a_y, $a_t, $b_x, $b_r, $b_y, $b_t, $i_x, $i_r, $i_y, $i_t;
    $a_x = gci_Rect_getX($a);
    $a_r = gci_Rect_getRight($a);
    $a_y = gci_Rect_getY($a);
    $a_t = gci_Rect_getTop($a);
    $b_x = gci_Rect_getX($b);
    $b_r = gci_Rect_getRight($b);
    $b_y = gci_Rect_getY($b);
    $b_t = gci_Rect_getTop($b);
    $i_x = jl_Math_max($a_x, $b_x);
    $i_r = jl_Math_min($a_r, $b_r);
    $i_y = jl_Math_max($a_y, $b_y);
    $i_t = jl_Math_min($a_t, $b_t);
    if ($i_x < $i_r && $i_y < $i_t)
        return gci_Rect__init_($i_x, $i_y, $i_r - $i_x | 0, $i_t - $i_y | 0);
    return null;
}
function gci_Rect_setX($this, $x) {
    $this.$x0 = $x;
}
function gci_Rect_setY($this, $y) {
    $this.$y0 = $y;
}
function gci_Rect_intersects($this, $otherBounds) {
    if ($otherBounds.$x0 >= gci_Rect_getRight($this))
        return 0;
    if ($this.$x0 >= gci_Rect_getRight($otherBounds))
        return 0;
    if ($otherBounds.$y0 >= gci_Rect_getTop($this))
        return 0;
    if ($this.$y0 < gci_Rect_getTop($otherBounds))
        return 1;
    return 0;
}
var jl_IncompatibleClassChangeError = $rt_classWithoutFields(jl_LinkageError);
function jl_IncompatibleClassChangeError__init_() {
    var var_0 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_0(var_0);
    return var_0;
}
function jl_IncompatibleClassChangeError__init_1(var_0) {
    var var_1 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_2(var_1, var_0);
    return var_1;
}
function jl_IncompatibleClassChangeError__init_0($this) {
    jl_LinkageError__init_0($this);
}
function jl_IncompatibleClassChangeError__init_2($this, $message) {
    jl_LinkageError__init_2($this, $message);
}
var jl_NoSuchMethodError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchMethodError__init_() {
    var var_0 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_0);
    return var_0;
}
function jl_NoSuchMethodError__init_1(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_2(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this) {
    jl_IncompatibleClassChangeError__init_0($this);
}
function jl_NoSuchMethodError__init_2($this, $message) {
    jl_IncompatibleClassChangeError__init_2($this, $message);
}
var ji_IOException = $rt_classWithoutFields(jl_Exception);
function ji_IOException__init_0() {
    var var_0 = new ji_IOException();
    ji_IOException__init_1(var_0);
    return var_0;
}
function ji_IOException__init_(var_0) {
    var var_1 = new ji_IOException();
    ji_IOException__init_2(var_1, var_0);
    return var_1;
}
function ji_IOException__init_1($this) {
    jl_Exception__init_0($this);
}
function ji_IOException__init_2($this, $message) {
    jl_Exception__init_2($this, $message);
}
var gc_PointCollisionQuery = $rt_classWithoutFields();
function gc_PointCollisionQuery__init_() {
    var var_0 = new gc_PointCollisionQuery();
    gc_PointCollisionQuery__init_0(var_0);
    return var_0;
}
function gc_PointCollisionQuery__init_0($this) {
    jl_Object__init_0($this);
}
var ju_Comparator = $rt_classWithoutFields(0);
var jl_String$_clinit_$lambda$_84_0 = $rt_classWithoutFields();
function jl_String$_clinit_$lambda$_84_0__init_() {
    var var_0 = new jl_String$_clinit_$lambda$_84_0();
    jl_String$_clinit_$lambda$_84_0__init_0(var_0);
    return var_0;
}
function jl_String$_clinit_$lambda$_84_0__init_0(var$0) {
    jl_Object__init_0(var$0);
}
var gc_CollisionChecker = $rt_classWithoutFields(0);
function gci_IBSPColChecker() {
    var a = this; jl_Object.call(a);
    a.$actorQuery = null;
    a.$neighbourQuery = null;
    a.$pointQuery = null;
    a.$inRangeQuery = null;
    a.$cellSize0 = 0;
    a.$bspTree = null;
}
var gci_IBSPColChecker_debugging = 0;
var gci_IBSPColChecker_dbgCounter = 0;
function gci_IBSPColChecker_$callClinit() {
    gci_IBSPColChecker_$callClinit = $rt_eraseClinit(gci_IBSPColChecker);
    gci_IBSPColChecker__clinit_();
}
function gci_IBSPColChecker__init_() {
    var var_0 = new gci_IBSPColChecker();
    gci_IBSPColChecker__init_0(var_0);
    return var_0;
}
function gci_IBSPColChecker__init_0($this) {
    gci_IBSPColChecker_$callClinit();
    jl_Object__init_0($this);
    $this.$actorQuery = gc_GOCollisionQuery__init_();
    $this.$neighbourQuery = gc_NeighbourCollisionQuery__init_();
    $this.$pointQuery = gc_PointCollisionQuery__init_();
    $this.$inRangeQuery = gc_InRangeQuery__init_();
}
function gci_IBSPColChecker_initialize($this, $width, $height, $cellSize, $wrap) {
    $this.$cellSize0 = $cellSize;
}
function gci_IBSPColChecker_addObject($this, $actor) {
    var $bounds, $splitAxis, $splitPos, $treeArea, $newArea, $bx, var$8, $newTop, $newArea_0, var$11, $treeArea_0, $by;
    $bounds = gci_IBSPColChecker_getActorBounds($this, $actor);
    if ($this.$bspTree === null) {
        if (gci_Rect_getWidth($bounds) <= gci_Rect_getHeight($bounds)) {
            $splitAxis = 1;
            $splitPos = gci_Rect_getMiddleY($bounds);
        } else {
            $splitAxis = 0;
            $splitPos = gci_Rect_getMiddleX($bounds);
        }
        $this.$bspTree = gci_BSPNodeCache_getBSPNode();
        gci_Rect_copyFrom(gci_BSPNode_getArea($this.$bspTree), $bounds);
        gci_BSPNode_setSplitAxis($this.$bspTree, $splitAxis);
        gci_BSPNode_setSplitPos($this.$bspTree, $splitPos);
        gci_BSPNode_addActor($this.$bspTree, $actor);
    } else {
        $treeArea = gci_BSPNode_getArea($this.$bspTree);
        while (!gci_Rect_contains($treeArea, $bounds)) {
            if (gci_Rect_getX($bounds) >= gci_Rect_getX($treeArea))
                $newArea = $treeArea;
            else {
                $bx = gci_Rect_getX($treeArea) - gci_Rect_getWidth($treeArea) | 0;
                $newArea = new gci_Rect;
                var$8 = gci_Rect_getY($treeArea);
                gci_Rect__init_0($newArea, $bx, var$8, gci_Rect_getRight($treeArea) - $bx | 0, gci_Rect_getHeight($treeArea));
                $newTop = gci_BSPNodeCache_getBSPNode();
                gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $newArea);
                gci_BSPNode_setSplitAxis($newTop, 0);
                gci_BSPNode_setSplitPos($newTop, gci_Rect_getX($treeArea));
                gci_BSPNode_setChild($newTop, 1, $this.$bspTree);
                $this.$bspTree = $newTop;
            }
            if (gci_Rect_getRight($bounds) <= gci_Rect_getRight($newArea))
                $newArea_0 = $newArea;
            else {
                $bx = gci_Rect_getRight($newArea) + gci_Rect_getWidth($newArea) | 0;
                $newArea_0 = new gci_Rect;
                var$8 = gci_Rect_getX($newArea);
                var$11 = gci_Rect_getY($newArea);
                gci_Rect__init_0($newArea_0, var$8, var$11, $bx - gci_Rect_getX($newArea) | 0, gci_Rect_getHeight($newArea));
                $newTop = gci_BSPNodeCache_getBSPNode();
                gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $newArea_0);
                gci_BSPNode_setSplitAxis($newTop, 0);
                gci_BSPNode_setSplitPos($newTop, gci_Rect_getRight($newArea));
                gci_BSPNode_setChild($newTop, 0, $this.$bspTree);
                $this.$bspTree = $newTop;
            }
            if (gci_Rect_getY($bounds) >= gci_Rect_getY($newArea_0))
                $treeArea_0 = $newArea_0;
            else {
                $by = gci_Rect_getY($newArea_0) - gci_Rect_getHeight($newArea_0) | 0;
                $treeArea_0 = new gci_Rect;
                var$8 = gci_Rect_getX($newArea_0);
                gci_Rect__init_0($treeArea_0, var$8, $by, gci_Rect_getWidth($newArea_0), gci_Rect_getTop($newArea_0) - $by | 0);
                $newTop = gci_BSPNodeCache_getBSPNode();
                gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $treeArea_0);
                gci_BSPNode_setSplitAxis($newTop, 1);
                gci_BSPNode_setSplitPos($newTop, gci_Rect_getY($newArea_0));
                gci_BSPNode_setChild($newTop, 1, $this.$bspTree);
                $this.$bspTree = $newTop;
            }
            if (gci_Rect_getTop($bounds) <= gci_Rect_getTop($treeArea_0)) {
                $treeArea = $treeArea_0;
                continue;
            }
            $by = gci_Rect_getTop($treeArea_0) + gci_Rect_getHeight($treeArea_0) | 0;
            $treeArea = new gci_Rect;
            var$8 = gci_Rect_getX($treeArea_0);
            var$11 = gci_Rect_getY($treeArea_0);
            gci_Rect__init_0($treeArea, var$8, var$11, gci_Rect_getWidth($treeArea_0), $by - gci_Rect_getY($treeArea_0) | 0);
            $newTop = gci_BSPNodeCache_getBSPNode();
            gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $treeArea);
            gci_BSPNode_setSplitAxis($newTop, 1);
            gci_BSPNode_setSplitPos($newTop, gci_Rect_getTop($treeArea_0));
            gci_BSPNode_setChild($newTop, 0, $this.$bspTree);
            $this.$bspTree = $newTop;
        }
        gci_IBSPColChecker_insertObject($this, $actor, $bounds, $bounds, $treeArea, $this.$bspTree);
    }
}
function gci_IBSPColChecker_insertObject($this, $actor, $actorBounds, $bounds, $area, $node) {
    var $leftArea, $rightArea, $leftIntersects, $rightIntersects, $newLeft, $newRight;
    if (gci_BSPNode_containsActor($node, $actor))
        return;
    a: {
        if (!gci_BSPNode_isEmpty($node)) {
            if (gci_Rect_getWidth($area) > gci_Rect_getWidth($actorBounds))
                break a;
            if (gci_Rect_getHeight($area) > gci_Rect_getHeight($actorBounds))
                break a;
        }
        gci_BSPNode_addActor($node, $actor);
        return;
    }
    $leftArea = gci_BSPNode_getLeftArea($node);
    $rightArea = gci_BSPNode_getRightArea($node);
    $leftIntersects = gci_Rect_getIntersection($leftArea, $bounds);
    $rightIntersects = gci_Rect_getIntersection($rightArea, $bounds);
    if ($leftIntersects !== null) {
        if (gci_BSPNode_getLeft($node) !== null)
            gci_IBSPColChecker_insertObject($this, $actor, $actorBounds, $leftIntersects, $leftArea, gci_BSPNode_getLeft($node));
        else {
            $newLeft = gci_IBSPColChecker_createNewNode($this, $leftArea);
            gci_BSPNode_addActor($newLeft, $actor);
            gci_BSPNode_setChild($node, 0, $newLeft);
        }
    }
    if ($rightIntersects !== null) {
        if (gci_BSPNode_getRight($node) !== null)
            gci_IBSPColChecker_insertObject($this, $actor, $actorBounds, $rightIntersects, $rightArea, gci_BSPNode_getRight($node));
        else {
            $newRight = gci_IBSPColChecker_createNewNode($this, $rightArea);
            gci_BSPNode_addActor($newRight, $actor);
            gci_BSPNode_setChild($node, 1, $newRight);
        }
    }
}
function gci_IBSPColChecker_createNewNode($this, $area) {
    var $splitAxis, $splitPos, $newNode;
    if (gci_Rect_getWidth($area) <= gci_Rect_getHeight($area)) {
        $splitAxis = 1;
        $splitPos = gci_Rect_getMiddleY($area);
    } else {
        $splitAxis = 0;
        $splitPos = gci_Rect_getMiddleX($area);
    }
    $newNode = gci_BSPNodeCache_getBSPNode();
    gci_BSPNode_setArea($newNode, $area);
    gci_BSPNode_setSplitAxis($newNode, $splitAxis);
    gci_BSPNode_setSplitPos($newNode, $splitPos);
    return $newNode;
}
function gci_IBSPColChecker_getActorBounds($this, $actor) {
    var $r;
    $r = g_ActorVisitor_getBoundingRect($actor);
    return $r;
}
function gci_IBSPColChecker_removeObject($this, $object) {
    var $node, $bspNode;
    $node = gci_IBSPColChecker_getNodeForActor($object);
    while ($node !== null) {
        $bspNode = gci_ActorNode_getBSPNode($node);
        gci_ActorNode_remove($node);
        gci_IBSPColChecker_checkRemoveNode($this, $bspNode);
        $node = gci_IBSPColChecker_getNodeForActor($object);
    }
}
function gci_IBSPColChecker_checkRemoveNode($this, $node) {
    var $node_0, $side, $left, $right;
    while ($node !== null && gci_BSPNode_isEmpty($node)) {
        $node_0 = gci_BSPNode_getParent($node);
        $side = $node_0 === null ? 3 : gci_BSPNode_getChildSide($node_0, $node);
        $left = gci_BSPNode_getLeft($node);
        $right = gci_BSPNode_getRight($node);
        if ($left === null) {
            if ($node_0 === null) {
                $this.$bspTree = $right;
                if ($right !== null)
                    gci_BSPNode_setParent($right, null);
            } else {
                if ($right !== null) {
                    gci_Rect_copyFrom(gci_BSPNode_getArea($right), gci_BSPNode_getArea($node));
                    gci_BSPNode_areaChanged($right);
                }
                gci_BSPNode_setChild($node_0, $side, $right);
            }
            gci_BSPNode_setChild($node, 1, null);
            gci_BSPNodeCache_returnNode($node);
        } else {
            if ($right !== null)
                break;
            if ($node_0 === null) {
                $this.$bspTree = $left;
                if ($left !== null)
                    gci_BSPNode_setParent($left, null);
            } else {
                if ($left !== null) {
                    gci_Rect_copyFrom(gci_BSPNode_getArea($left), gci_BSPNode_getArea($node));
                    gci_BSPNode_areaChanged($left);
                }
                gci_BSPNode_setChild($node_0, $side, $left);
            }
            gci_BSPNode_setChild($node, 0, null);
            gci_BSPNodeCache_returnNode($node);
        }
        $node = $node_0;
    }
    return $node;
}
function gci_IBSPColChecker_getNodeForActor($object) {
    gci_IBSPColChecker_$callClinit();
    return g_ActorVisitor_getData($object);
}
function gci_IBSPColChecker_setNodeForActor($object, $node) {
    gci_IBSPColChecker_$callClinit();
    g_ActorVisitor_setData($object, $node);
}
function gci_IBSPColChecker_updateObject($this, $object) {
    var $node, $newBounds, $rNode, var$5, $bspNode, var$7, $bspArea, $iter;
    $node = gci_IBSPColChecker_getNodeForActor($object);
    if ($node === null)
        return;
    $newBounds = gci_IBSPColChecker_getActorBounds($this, $object);
    if (!gci_Rect_contains(gci_BSPNode_getArea($this.$bspTree), $newBounds)) {
        while ($node !== null) {
            $rNode = gci_ActorNode_getBSPNode($node);
            gci_ActorNode_remove($node);
            gci_IBSPColChecker_checkRemoveNode($this, $rNode);
            $node = gci_ActorNode_getNext($node);
        }
        $this.$addObject($object);
        return;
    }
    while (true) {
        if ($node === null) {
            var$5 = gci_IBSPColChecker_getNodeForActor($object);
            if (var$5 === null)
                $bspNode = $this.$bspTree;
            else {
                $bspNode = gci_ActorNode_getBSPNode(var$5);
                while ($bspNode !== null && !gci_Rect_contains(gci_BSPNode_getArea($bspNode), $newBounds)) {
                    $bspNode = gci_BSPNode_getParent($bspNode);
                }
                if ($bspNode === null) {
                    while (var$5 !== null) {
                        var$7 = gci_ActorNode_getBSPNode(var$5);
                        gci_ActorNode_remove(var$5);
                        gci_IBSPColChecker_checkRemoveNode($this, var$7);
                        var$5 = gci_ActorNode_getNext(var$5);
                    }
                    $this.$addObject($object);
                    return;
                }
            }
            $bspArea = gci_BSPNode_getArea($bspNode);
            gci_IBSPColChecker_insertObject($this, $object, $newBounds, $newBounds, $bspArea, $bspNode);
            var$5 = gci_IBSPColChecker_getNodeForActor($object);
            while (var$5 !== null) {
                if (!gci_ActorNode_checkMark(var$5)) {
                    var$7 = gci_ActorNode_getBSPNode(var$5);
                    gci_ActorNode_remove(var$5);
                    gci_IBSPColChecker_checkRemoveNode($this, var$7);
                }
                var$5 = gci_ActorNode_getNext(var$5);
            }
            return;
        }
        $bspNode = gci_ActorNode_getBSPNode($node);
        $bspArea = gci_BSPNode_getArea($bspNode);
        if (gci_Rect_contains($bspArea, $newBounds)) {
            $iter = gci_IBSPColChecker_getNodeForActor($object);
            while ($iter !== null) {
                if ($iter !== $node) {
                    $rNode = gci_ActorNode_getBSPNode($iter);
                    gci_ActorNode_remove($iter);
                    gci_IBSPColChecker_checkRemoveNode($this, $rNode);
                }
                $iter = gci_ActorNode_getNext($iter);
            }
            return;
        }
        if (!gci_Rect_intersects($bspArea, $newBounds)) {
            $rNode = gci_ActorNode_getBSPNode($node);
            gci_ActorNode_remove($node);
            gci_IBSPColChecker_checkRemoveNode($this, $rNode);
            if ($this.$bspTree === null)
                break;
        }
        gci_ActorNode_clearMark($node);
        $node = gci_ActorNode_getNext($node);
    }
    $this.$addObject($object);
}
function gci_IBSPColChecker_updateObjectLocation($this, $object, $oldX, $oldY) {
    gci_IBSPColChecker_updateObject($this, $object);
}
function gci_IBSPColChecker_updateObjectSize($this, $object) {
    gci_IBSPColChecker_updateObject($this, $object);
}
function gci_IBSPColChecker_checkForOneCollision($this, $ignore, $node, $query) {
    var $i, $candidate;
    $i = gci_BSPNode_getActorsIterator($node);
    while (true) {
        if (!$i.$hasNext())
            return null;
        $candidate = $i.$next1();
        if ($ignore !== $candidate && $query.$checkCollision($candidate))
            break;
    }
    return $candidate;
}
function gci_IBSPColChecker_getOneObjectDownTree($this, $ignore, $r, $query, $startNode) {
    var $nodeStack, $node, $res, $left, $right;
    if ($startNode === null)
        return null;
    $nodeStack = ju_LinkedList__init_();
    $nodeStack.$add($startNode);
    while (true) {
        if ($nodeStack.$isEmpty())
            return null;
        $node = $nodeStack.$removeLast();
        if (gci_Rect_intersects(gci_BSPNode_getArea($node), $r)) {
            $res = gci_IBSPColChecker_checkForOneCollision($this, $ignore, $node, $query);
            if ($res !== null)
                break;
            $left = gci_BSPNode_getLeft($node);
            $right = gci_BSPNode_getRight($node);
            if ($left !== null)
                $nodeStack.$add($left);
            if ($right !== null)
                $nodeStack.$add($right);
        }
    }
    return $res;
}
function gci_IBSPColChecker_getOneIntersectingDown($this, $r, $query, $actor) {
    var $nodeStack, $node, $res, $left, $right;
    if ($this.$bspTree === null)
        return null;
    $nodeStack = ju_LinkedList__init_();
    $nodeStack.$add($this.$bspTree);
    while (true) {
        if ($nodeStack.$isEmpty())
            return null;
        $node = $nodeStack.$removeLast();
        if (gci_Rect_contains(gci_BSPNode_getArea($node), $r)) {
            $res = gci_IBSPColChecker_checkForOneCollision($this, $actor, $node, $query);
            if ($res !== null)
                break;
            $left = gci_BSPNode_getLeft($node);
            $right = gci_BSPNode_getRight($node);
            if ($left !== null)
                $nodeStack.$add($left);
            if ($right !== null)
                $nodeStack.$add($right);
        }
    }
    return $res;
}
function gci_IBSPColChecker_getOneIntersectingUp($this, $r, $query, $actor, $start) {
    var $res;
    a: {
        while (true) {
            if ($start === null)
                break a;
            if (gci_Rect_contains(gci_BSPNode_getArea($start), $r))
                break a;
            $res = gci_IBSPColChecker_checkForOneCollision($this, $actor, $start, $query);
            if ($res !== null)
                break;
            $start = gci_BSPNode_getParent($start);
        }
        return $res;
    }
    return null;
}
function gci_IBSPColChecker_startSequence($this) {}
function gci_IBSPColChecker_getOneIntersectingObject($this, $actor, $cls) {
    var $r, var$4, $node, var$6, $bspNode, $ret, $$je;
    $r = gci_IBSPColChecker_getActorBounds($this, $actor);
    var$4 = $this.$actorQuery;
    jl_Object_monitorEnterSync(var$4);
    a: {
        try {
            $this.$actorQuery.$init($cls, $actor);
            $node = gci_IBSPColChecker_getNodeForActor($actor);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$6 = $$je;
            break a;

        }
        b: {
            c: {
                try {
                    while (true) {
                        $bspNode = gci_ActorNode_getBSPNode($node);
                        $ret = gci_IBSPColChecker_getOneObjectDownTree($this, $actor, $r, $this.$actorQuery, $bspNode);
                        if ($ret !== null)
                            break;
                        var$6 = $this.$getOneIntersectingUp($r, $this.$actorQuery, $actor, gci_BSPNode_getParent($bspNode));
                        if (var$6 !== null)
                            break c;
                        $node = gci_ActorNode_getNext($node);
                        if ($node === null)
                            break b;
                    }
                    jl_Object_monitorExitSync(var$4);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$6 = $$je;
                    break a;

                }
                return $ret;
            }
            try {
                jl_Object_monitorExitSync(var$4);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;
                break a;

            }
            return var$6;
        }
        try {
            var$6 = gci_IBSPColChecker_getOneIntersectingDown($this, $r, $this.$actorQuery, $actor);
            jl_Object_monitorExitSync(var$4);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$6 = $$je;
            break a;

        }
        return var$6;
    }
    jl_Object_monitorExitSync(var$4);
    $rt_throw(var$6);
}
function gci_IBSPColChecker__clinit_() {
    gci_IBSPColChecker_debugging = 0;
    gci_IBSPColChecker_dbgCounter = 0;
}
function ju_AbstractList$1() {
    var a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount = 0;
    a.$size = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
function ju_AbstractList$1__init_(var_0) {
    var var_1 = new ju_AbstractList$1();
    ju_AbstractList$1__init_0(var_1, var_0);
    return var_1;
}
function ju_AbstractList$1__init_0($this, $this$0) {
    $this.$this$0 = $this$0;
    jl_Object__init_0($this);
    $this.$modCount = $this.$this$0.$modCount0;
    $this.$size = $this.$this$0.$size0();
    $this.$removeIndex = (-1);
}
function ju_AbstractList$1_hasNext($this) {
    return $this.$index >= $this.$size ? 0 : 1;
}
function ju_AbstractList$1_next($this) {
    var var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$removeIndex = $this.$index;
    var$1 = $this.$this$0;
    var$2 = $this.$index;
    $this.$index = var$2 + 1 | 0;
    return var$1.$get(var$2);
}
function ju_AbstractList$1_remove($this) {
    if ($this.$removeIndex < 0)
        $rt_throw(jl_IllegalStateException__init_0());
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$this$0.$remove0($this.$removeIndex);
    $this.$modCount = $this.$this$0.$modCount0;
    if ($this.$removeIndex < $this.$index)
        $this.$index = $this.$index - 1 | 0;
    $this.$size = $this.$size - 1 | 0;
    $this.$removeIndex = (-1);
}
function ju_AbstractList$1_checkConcurrentModification($this) {
    if ($this.$modCount >= $this.$this$0.$modCount0)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
var gc_ActInterruptedException = $rt_classWithoutFields(jl_RuntimeException);
function gc_ActInterruptedException__init_() {
    var var_0 = new gc_ActInterruptedException();
    gc_ActInterruptedException__init_0(var_0);
    return var_0;
}
function gc_ActInterruptedException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function gc_ImageCache() {
    jl_Object.call(this);
    this.$imageCache = null;
}
var gc_ImageCache_instance = null;
function gc_ImageCache_$callClinit() {
    gc_ImageCache_$callClinit = $rt_eraseClinit(gc_ImageCache);
    gc_ImageCache__clinit_();
}
function gc_ImageCache__init_() {
    var var_0 = new gc_ImageCache();
    gc_ImageCache__init_0(var_0);
    return var_0;
}
function gc_ImageCache__init_0($this) {
    gc_ImageCache_$callClinit();
    jl_Object__init_0($this);
    $this.$imageCache = ju_HashMap__init_();
}
function gc_ImageCache_getInstance() {
    gc_ImageCache_$callClinit();
    return gc_ImageCache_instance;
}
function gc_ImageCache_addCachedImage($this, $fileName, $image) {
    var var$3, $cr, var$5, $$je;
    var$3 = $this.$imageCache;
    jl_Object_monitorEnterSync(var$3);
    a: {
        try {
            if ($image === null)
                $this.$imageCache.$put($fileName, null);
            else {
                $cr = gc_ImageCache$CachedImageRef__init_($this, $fileName, $image);
                $this.$imageCache.$put($fileName, $cr);
            }
            jl_Object_monitorExitSync(var$3);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$5 = $$je;
            break a;

        }
        return 1;
    }
    jl_Object_monitorExitSync(var$3);
    $rt_throw(var$5);
}
function gc_ImageCache_getCachedImage($this, $fileName) {
    var var$2, $sr, var$4, $$je;
    var$2 = $this.$imageCache;
    jl_Object_monitorEnterSync(var$2);
    a: {
        b: {
            try {
                $sr = $this.$imageCache.$get0($fileName);
                if ($sr !== null)
                    break b;
                var$4 = null;
                jl_Object_monitorExitSync(var$2);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
            return var$4;
        }
        try {
            var$4 = $sr.$get1();
            jl_Object_monitorExitSync(var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return var$4;
    }
    jl_Object_monitorExitSync(var$2);
    $rt_throw(var$4);
}
function gc_ImageCache__clinit_() {
    gc_ImageCache_instance = gc_ImageCache__init_();
}
var jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException);
function jl_UnsupportedOperationException__init_() {
    var var_0 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_0(var_0);
    return var_0;
}
function jl_UnsupportedOperationException__init_1(var_0) {
    var var_1 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_2(var_1, var_0);
    return var_1;
}
function jl_UnsupportedOperationException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jl_UnsupportedOperationException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
var jn_ReadOnlyBufferException = $rt_classWithoutFields(jl_UnsupportedOperationException);
function jn_ReadOnlyBufferException__init_() {
    var var_0 = new jn_ReadOnlyBufferException();
    jn_ReadOnlyBufferException__init_0(var_0);
    return var_0;
}
function jn_ReadOnlyBufferException__init_0($this) {
    jl_UnsupportedOperationException__init_0($this);
}
var ge_WorldListener = $rt_classWithoutFields(0);
function gc_Simulation() {
    var a = this; jl_Thread.call(a);
    a.$worldHandler = null;
    a.$paused = 0;
    a.$enabled = 0;
    a.$runOnce = 0;
    a.$queuedTasks = null;
    a.$listenerList = null;
    a.$startedEvent = null;
    a.$stoppedEvent = null;
    a.$disabledEvent = null;
    a.$speedChangeEvent = null;
    a.$debuggerPausedEvent = null;
    a.$debuggerResumedEvent = null;
    a.$newActRoundEvent = null;
    a.$taskBeginEvent = null;
    a.$taskEndEvent = null;
    a.$speed = 0;
    a.$lastDelayTime = Long_ZERO;
    a.$delay = Long_ZERO;
    a.$repaintLock = null;
    a.$delegate = null;
    a.$interruptLock = null;
    a.$delaying = 0;
    a.$interruptDelay = 0;
    a.$asking = 0;
    a.$isRunning = 0;
    a.$abort = 0;
}
var gc_Simulation_instance = null;
var gc_Simulation_RUN_QUEUED_TASKS = null;
function gc_Simulation_$callClinit() {
    gc_Simulation_$callClinit = $rt_eraseClinit(gc_Simulation);
    gc_Simulation__clinit_();
}
function gc_Simulation__init_(var_0) {
    var var_1 = new gc_Simulation();
    gc_Simulation__init_0(var_1, var_0);
    return var_1;
}
function gc_Simulation__init_0($this, $simulationDelegate) {
    gc_Simulation_$callClinit();
    jl_Thread__init_0($this);
    $this.$queuedTasks = ju_LinkedList__init_();
    $this.$listenerList = ju_ArrayList__init_();
    $this.$repaintLock = jl_Object__init_();
    $this.$interruptLock = jl_Object__init_();
    $this.$isRunning = 0;
    $this.$delegate = $simulationDelegate;
    $this.$startedEvent = ge_SimulationEvent__init_($this, 0);
    $this.$stoppedEvent = ge_SimulationEvent__init_($this, 1);
    $this.$speedChangeEvent = ge_SimulationEvent__init_($this, 2);
    $this.$disabledEvent = ge_SimulationEvent__init_($this, 3);
    $this.$debuggerPausedEvent = ge_SimulationEvent__init_($this, 5);
    $this.$debuggerResumedEvent = ge_SimulationEvent__init_($this, 6);
    $this.$newActRoundEvent = ge_SimulationEvent__init_($this, 7);
    $this.$taskBeginEvent = ge_SimulationEvent__init_($this, 8);
    $this.$taskEndEvent = ge_SimulationEvent__init_($this, 9);
    jl_Thread_setPriority($this, 1);
    $this.$paused = 1;
    $this.$speed = 50;
    $this.$delay = gc_Simulation_calculateDelay($this, $this.$speed);
}
function gc_Simulation_initialize($simulationDelegate) {
    gc_Simulation_$callClinit();
    gc_Simulation_instance = gc_Simulation__init_($simulationDelegate);
}
function gc_Simulation_getInstance() {
    gc_Simulation_$callClinit();
    return gc_Simulation_instance;
}
function gc_Simulation_attachWorldHandler($this, $worldHandler) {
    $this.$worldHandler = $worldHandler;
    $worldHandler.$addWorldListener($this);
    $this.$addSimulationListener($worldHandler);
    $this.$start();
}
function gc_Simulation_run($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        gc_Simulation_runContent($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function gc_Simulation_runContent($this) {
    var $t, $world, var$3, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$world = $thread.pop();$t = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        while (!$this.$abort) {
            a: {
                b: {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break b;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            $ptr = 3;
                            continue main;
                        } else {
                            throw $$e;
                        }
                    }
                    break a;
                }
            }
            ($this.$worldHandler.$getKeyboardManager()).$clearLatches();
        }
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        c: {
            try {
                if ($this.$isRunning) {
                    $world = $this.$worldHandler.$getWorld();
                    if ($world !== null)
                        gc_Simulation_worldStopped($world);
                    $this.$isRunning = 0;
                }
                jl_Object_monitorExit($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;
                break c;

            }
            return;
        }
        jl_Object_monitorExit($this);
        $rt_throw(var$3);
    case 2:
        c: {
            d: {
                a: {
                    try {
                        gc_Simulation_maybePause($this);
                        if ($rt_suspending()) {
                            break main;
                        }
                        if (!$this.$worldHandler.$hasWorld()) {
                            $ptr = 4;
                            continue main;
                        }
                        var$3 = $this.$worldHandler.$getWorld();
                        $ptr = 5;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break a;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                    break d;
                }
            }
            e: while (true) {
                ($this.$worldHandler.$getKeyboardManager()).$clearLatches();
                if ($this.$abort)
                    break;
                f: {
                    try {
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break f;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                    continue e;
                }
            }
            $ptr = 1;
            continue main;
        }
        $ptr = 3;
    case 3:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        c: {
            try {
                $this.$paused = 1;
                jl_Object_monitorExit($this);
                break c;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
            jl_Object_monitorExit($this);
            $rt_throw(var$3);
        }
        $t.$printStackTrace0();
        a: while (true) {
            ($this.$worldHandler.$getKeyboardManager()).$clearLatches();
            if ($this.$abort)
                break;
            g: {
                try {
                    $ptr = 2;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                    } else if ($$je instanceof jl_InterruptedException) {
                        break g;
                    } else if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                        continue main;
                    } else {
                        throw $$e;
                    }
                }
                continue a;
            }
        }
        $ptr = 1;
        continue main;
    case 4:
        c: {
            d: {
                a: {
                    try {
                        gc_Simulation_delay($this);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break d;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break a;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                    break d;
                }
            }
            g: while (true) {
                ($this.$worldHandler.$getKeyboardManager()).$clearLatches();
                if ($this.$abort)
                    break;
                h: {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break h;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                    continue g;
                }
            }
            $ptr = 1;
            continue main;
        }
        $ptr = 3;
        continue main;
    case 5:
        c: {
            d: {
                a: {
                    try {
                        gc_Simulation_runOneLoop($this, var$3);
                        if ($rt_suspending()) {
                            break main;
                        }
                        $ptr = 4;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break a;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                    break d;
                }
            }
            g: while (true) {
                ($this.$worldHandler.$getKeyboardManager()).$clearLatches();
                if ($this.$abort)
                    break;
                h: {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break h;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                    continue g;
                }
            }
            $ptr = 1;
            continue main;
        }
        $ptr = 3;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $t, $world, var$3, $ptr);
}
function gc_Simulation_simulationWait($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        jl_Object_wait1($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function gc_Simulation_worldStarted($world) {
    gc_Simulation_$callClinit();
    $world.$started();
}
function gc_Simulation_worldStopped($world) {
    gc_Simulation_$callClinit();
    $world.$stopped();
}
function gc_Simulation_maybePause($this) {
    var $checkStop, $world, var$3, var$4, $doResumeRunning, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$doResumeRunning = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$world = $thread.pop();$checkStop = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                try {
                    $checkStop = !(!$this.$paused && $this.$enabled) && $this.$isRunning ? 1 : 0;
                    $world = $this.$worldHandler.$getWorld();
                    if ($checkStop) {
                        $this.$isRunning = 0;
                        var$3 = $this.$interruptLock;
                        $ptr = 2;
                        continue main;
                    }
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;
                    break b;

                }
                c: {
                    try {
                        if (!$this.$isRunning)
                            break c;
                        jl_Object_monitorExit($this);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$3 = $$je;
                        break b;

                    }
                    return;
                }
                try {
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$3);
        }
        if (!$checkStop) {
            $ptr = 3;
            continue main;
        }
        d: {
            try {
                gc_Simulation_signalStopping($this, $world);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break d;
                } else {
                    throw $$e;
                }
            }
            $ptr = 4;
            continue main;
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        continue main;
    case 2:
        a: {
            try {
                jl_Object_monitorEnter(var$3);
                if ($rt_suspending()) {
                    break main;
                }
                e: {
                    try {
                        $this.$interruptDelay = 0;
                        jl_Object_monitorExit(var$3);
                        break e;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$4 = $$je;

                    }
                    jl_Object_monitorExit(var$3);
                    $rt_throw(var$4);
                }
                jl_Object_monitorExit($this);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
            jl_Object_monitorExit($this);
            $rt_throw(var$3);
        }
        if (!$checkStop) {
            $ptr = 3;
            continue main;
        }
        f: {
            try {
                gc_Simulation_signalStopping($this, $world);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break f;
                } else {
                    throw $$e;
                }
            }
            $ptr = 4;
            continue main;
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    case 3:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                e: {
                    try {
                        $doResumeRunning = !$this.$paused && $this.$enabled && !$this.$abort && !$this.$isRunning ? 1 : 0;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$3 = $$je;
                        break e;

                    }
                    g: {
                        try {
                            if (!$this.$isRunning && !$doResumeRunning && !$this.$runOnce)
                                break g;
                            jl_Object_monitorExit($this);
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$3 = $$je;
                            break e;

                        }
                        if ($doResumeRunning)
                            gc_Simulation_resumeRunning($this);
                        $ptr = 5;
                        continue main;
                    }
                    d: {
                        try {
                            if (!$this.$enabled)
                                break d;
                            gc_Simulation_fireSimulationEvent($this, $this.$stoppedEvent);
                            break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$3 = $$je;
                            break e;

                        }
                    }
                    h: {
                        try {
                            if ($this.$worldHandler === null)
                                break h;
                            $this.$worldHandler.$repaint();
                            break h;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$3 = $$je;
                            break e;

                        }
                    }
                    i: {
                        try {
                            if ($this.$queuedTasks.$isEmpty())
                                break i;
                            jl_Object_monitorExit($this);
                            break a;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$3 = $$je;
                            break e;

                        }
                    }
                    try {
                        jl_System_gc();
                        try {
                            $ptr = 6;
                            continue main;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_InterruptedException) {
                            } else {
                                throw $$e;
                            }
                        }
                        jl_Object_monitorExit($this);
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$3 = $$je;

                    }
                }
                jl_Object_monitorExit($this);
                $rt_throw(var$3);
            }
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    case 4:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                $this.$runOnce = 0;
                if (!$this.$paused)
                    $this.$isRunning = $this.$enabled;
                jl_Object_monitorExit($this);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
            jl_Object_monitorExit($this);
            $rt_throw(var$3);
        }
        $ptr = 3;
        continue main;
    case 5:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                e: {
                    try {
                        if (!$this.$runOnce && !$this.$isRunning)
                            break e;
                        $this.$runOnce = 0;
                        jl_Object_monitorExit($this);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$3 = $$je;
                        break b;

                    }
                    return;
                }
                try {
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$3);
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    case 6:
        a: {
            try {
                e: {
                    try {
                        gc_Simulation_simulationWait($this);
                        if ($rt_suspending()) {
                            break main;
                        }
                        $this.$lastDelayTime = jl_System_nanoTime();
                        break e;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                }
                jl_Object_monitorExit($this);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
            jl_Object_monitorExit($this);
            $rt_throw(var$3);
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $checkStop, $world, var$3, var$4, $doResumeRunning, $ptr);
}
function gc_Simulation_resumeRunning($this) {
    var $world, $t, var$3, var$4, $$je;
    a: {
        b: {
            c: {
                d: {
                    $this.$isRunning = 1;
                    $this.$lastDelayTime = jl_System_nanoTime();
                    gc_Simulation_fireSimulationEvent($this, $this.$startedEvent);
                    $world = $this.$worldHandler.$getWorld();
                    if ($world !== null)
                        try {
                            gc_Simulation_worldStarted($world);
                            break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Throwable) {
                                $t = $$je;
                                break c;
                            } else{
                                var$3 = $$je;
                                break b;
                            }
                        }
                }
                return;
            }
            try {
                $this.$isRunning = 0;
                var$3 = $this.$interruptLock;
                jl_Object_monitorEnterSync(var$3);
                e: {
                    try {
                        jl_Thread_interrupted();
                        $this.$interruptDelay = 0;
                        jl_Object_monitorExitSync(var$3);
                        break e;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$4 = $$je;

                    }
                    jl_Object_monitorExitSync(var$3);
                    $rt_throw(var$4);
                }
                $this.$setPaused(1);
                $t.$printStackTrace0();
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
        }
        $rt_throw(var$3);
    }
}
function gc_Simulation_signalStopping($this, $world) {
    var $aie, $t, var$4, $$je;
    a: {
        if ($world !== null)
            b: {
                try {
                    c: {
                        try {
                            gc_Simulation_worldStopped($world);
                            break a;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof gc_ActInterruptedException) {
                                $aie = $$je;
                            } else if ($$je instanceof jl_Throwable) {
                                $t = $$je;
                                break c;
                            } else {
                                throw $$e;
                            }
                        }
                        jl_Object_monitorEnterSync($this);
                        d: {
                            try {
                                $this.$paused = 1;
                                jl_Object_monitorExitSync($this);
                                break d;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$4 = $$je;

                            }
                            jl_Object_monitorExitSync($this);
                            $rt_throw(var$4);
                        }
                        $rt_throw($aie);
                    }
                    jl_Object_monitorEnterSync($this);
                    e: {
                        try {
                            $this.$paused = 1;
                            jl_Object_monitorExitSync($this);
                            break e;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$4 = $$je;

                        }
                        jl_Object_monitorExitSync($this);
                        $rt_throw(var$4);
                    }
                    $t.$printStackTrace0();
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;

                }
                $rt_throw(var$4);
            }
    }
}
function gc_Simulation_runQueuedTasks($this) {
    var $r, var$2, $world, $t, $$je;
    jl_Object_monitorEnterSync($this);
    a: {
        try {
            $r = $this.$queuedTasks.$poll();
            jl_Object_monitorExitSync($this);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;

        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$2);
    }
    while ($r !== null) {
        $world = (gc_WorldHandler_getInstance()).$getWorld();
        gc_Simulation_fireSimulationEvent($this, $this.$taskBeginEvent);
        b: {
            try {
                $r.$run();
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    $t = $$je;
                } else {
                    throw $$e;
                }
            }
            $t.$printStackTrace0();
        }
        gc_Simulation_fireSimulationEvent($this, $this.$taskEndEvent);
        jl_Object_monitorEnterSync($this);
        try {
            $r = $this.$queuedTasks.$poll();
            jl_Object_monitorExitSync($this);
            continue;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            jl_Object_monitorExitSync($this);
            $rt_throw(var$2);

        }
    }
}
function gc_Simulation_runOneLoop($this, $world) {
    var $e, $allObjects, $awakeObjects, var$5, $possiblySleepingActor, var$7, $actor, $e_0, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$e_0 = $thread.pop();$actor = $thread.pop();var$7 = $thread.pop();$possiblySleepingActor = $thread.pop();var$5 = $thread.pop();$awakeObjects = $thread.pop();$allObjects = $thread.pop();$e = $thread.pop();$world = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gc_Simulation_fireSimulationEvent($this, $this.$newActRoundEvent);
        $e = null;
        try {
            $ptr = 1;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof gc_ActInterruptedException) {
                $e = $$je;
            } else {
                throw $$e;
            }
        }
        $allObjects = g_WorldVisitor_getObjectsListInActOrder($world);
        $awakeObjects = ju_ArrayList__init_0($allObjects.$size0());
        var$5 = $allObjects.$iterator();
        while (var$5.$hasNext()) {
            $possiblySleepingActor = var$5.$next1();
            if (g_ActorVisitor_decrementSleepForIfPositive($possiblySleepingActor))
                $awakeObjects.$add($possiblySleepingActor);
        }
        var$7 = $awakeObjects.$iterator();
        while (true) {
            if (!var$7.$hasNext()) {
                if ($e !== null)
                    $rt_throw($e);
                gc_Simulation_repaintIfNeeded($this);
                return;
            }
            $actor = var$7.$next1();
            if (!$this.$enabled)
                break;
            if (g_ActorVisitor_getWorld($actor) !== null) {
                try {
                    $ptr = 2;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                        $e_0 = $$je;
                    } else {
                        throw $$e;
                    }
                }
                if ($e === null)
                    $e = $e_0;
            }
        }
        return;
    case 1:
        a: {
            b: {
                try {
                    gc_Simulation_actWorld($world);
                    if ($rt_suspending()) {
                        break main;
                    }
                    if ($world === $this.$worldHandler.$getWorld())
                        break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                        $e = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                return;
            }
        }
        $allObjects = g_WorldVisitor_getObjectsListInActOrder($world);
        $awakeObjects = ju_ArrayList__init_0($allObjects.$size0());
        var$5 = $allObjects.$iterator();
        while (var$5.$hasNext()) {
            $possiblySleepingActor = var$5.$next1();
            if (g_ActorVisitor_decrementSleepForIfPositive($possiblySleepingActor))
                $awakeObjects.$add($possiblySleepingActor);
        }
        var$7 = $awakeObjects.$iterator();
        while (true) {
            if (!var$7.$hasNext()) {
                if ($e !== null)
                    $rt_throw($e);
                gc_Simulation_repaintIfNeeded($this);
                return;
            }
            $actor = var$7.$next1();
            if (!$this.$enabled)
                break;
            if (g_ActorVisitor_getWorld($actor) !== null) {
                try {
                    $ptr = 2;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                        $e_0 = $$je;
                    } else {
                        throw $$e;
                    }
                }
                if ($e === null)
                    $e = $e_0;
            }
        }
        return;
    case 2:
        a: {
            b: {
                try {
                    gc_Simulation_actActor($actor);
                    if ($rt_suspending()) {
                        break main;
                    }
                    if ($world === $this.$worldHandler.$getWorld())
                        break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                        $e_0 = $$je;
                        if ($e !== null)
                            break a;
                        $e = $e_0;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                return;
            }
        }
        while (true) {
            if (!var$7.$hasNext()) {
                if ($e !== null)
                    $rt_throw($e);
                gc_Simulation_repaintIfNeeded($this);
                return;
            }
            $actor = var$7.$next1();
            if (!$this.$enabled)
                break;
            if (g_ActorVisitor_getWorld($actor) === null)
                continue;
            try {
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof gc_ActInterruptedException) {
                    $e_0 = $$je;
                } else {
                    throw $$e;
                }
            }
            if ($e !== null)
                continue;
            $e = $e_0;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $world, $e, $allObjects, $awakeObjects, var$5, $possiblySleepingActor, var$7, $actor, $e_0, $ptr);
}
function gc_Simulation_actActor($actor) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$actor = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gc_Simulation_$callClinit();
        $ptr = 1;
    case 1:
        $actor.$act();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($actor, $ptr);
}
function gc_Simulation_actWorld($world) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$world = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gc_Simulation_$callClinit();
        $ptr = 1;
    case 1:
        $world.$act();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($world, $ptr);
}
function gc_Simulation_repaintIfNeeded($this) {
    $this.$worldHandler.$repaint();
}
function gc_Simulation_setPaused($this, $b) {
    var var$2, var$3, $$je;
    jl_Object_monitorEnterSync($this);
    try {
        jl_Object_monitorEnterSync($this);
        a: {
            b: {
                try {
                    if ($this.$paused != $b)
                        break b;
                    jl_Object_monitorExitSync($this);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
                return;
            }
            c: {
                try {
                    $this.$paused = $b;
                    if (!$this.$enabled)
                        break c;
                    if (!$this.$paused) {
                        var$2 = $this.$interruptLock;
                        jl_Object_monitorEnterSync(var$2);
                        d: {
                            try {
                                $this.$interruptDelay = 0;
                                jl_Object_monitorExitSync(var$2);
                                break d;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$3 = $$je;

                            }
                            jl_Object_monitorExitSync(var$2);
                            $rt_throw(var$3);
                        }
                    }
                    jl_Object_notifyAll($this);
                    if (!$this.$paused)
                        break c;
                    gc_Simulation_interruptDelay($this);
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
            }
            try {
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$2);
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gc_Simulation_interruptDelay($this) {
    var var$1, var$2, $$je;
    var$1 = $this.$interruptLock;
    jl_Object_monitorEnterSync(var$1);
    a: {
        try {
            if ($this.$delaying)
                $this.$interrupt();
            else
                $this.$interruptDelay = 1;
            jl_Object_monitorExitSync(var$1);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync(var$1);
    $rt_throw(var$2);
}
function gc_Simulation_setEnabled($this, $b) {
    var var$2, var$3, $$je;
    jl_Object_monitorEnterSync($this);
    try {
        jl_Object_monitorEnterSync($this);
        a: {
            b: {
                try {
                    if ($b != $this.$enabled)
                        break b;
                    jl_Object_monitorExitSync($this);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
                return;
            }
            c: {
                try {
                    $this.$enabled = $b;
                    if ($b) {
                        ($this.$worldHandler.$getKeyboardManager()).$getKey0();
                        ($this.$worldHandler.$getKeyboardManager()).$clearLatches();
                        jl_Object_notifyAll($this);
                        if (!$this.$paused)
                            break c;
                        gc_Simulation_fireSimulationEvent($this, $this.$stoppedEvent);
                        break c;
                    }
                    gc_Simulation_interruptDelay($this);
                    if (!$this.$paused) {
                        $this.$paused = 1;
                        $this.$isRunning = 0;
                    } else {
                        var$2 = $this.$interruptLock;
                        jl_Object_monitorEnterSync(var$2);
                        d: {
                            try {
                                $this.$interruptDelay = 0;
                                jl_Object_monitorExitSync(var$2);
                                break d;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$3 = $$je;

                            }
                            jl_Object_monitorExitSync(var$2);
                            $rt_throw(var$3);
                        }
                    }
                    gc_Simulation_fireSimulationEvent($this, $this.$disabledEvent);
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
            }
            try {
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$2);
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gc_Simulation_fireSimulationEvent($this, $event) {
    var var$2, $listeners, var$4, var$5, $i, $$je;
    var$2 = $this.$listenerList;
    jl_Object_monitorEnterSync(var$2);
    a: {
        try {
            $listeners = $this.$listenerList.$toArray($rt_createArray(ge_SimulationListener, $this.$listenerList.$size0()));
            jl_Object_monitorExitSync(var$2);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;

        }
        jl_Object_monitorExitSync(var$2);
        $rt_throw(var$4);
    }
    var$5 = $listeners.data;
    $i = var$5.length - 1 | 0;
    while ($i >= 0) {
        var$5[$i].$simulationChanged($event);
        $i = $i + (-1) | 0;
    }
}
function gc_Simulation_addSimulationListener($this, $l) {
    var var$2, var$3, $$je;
    var$2 = $this.$listenerList;
    jl_Object_monitorEnterSync(var$2);
    a: {
        try {
            $this.$listenerList.$add($l);
            jl_Object_monitorExitSync(var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync(var$2);
    $rt_throw(var$3);
}
function gc_Simulation_setSpeed($this, $speed) {
    var $speedChanged, var$3, var$4, $$je;
    if ($speed < 0)
        $speed = 0;
    else if ($speed > 100)
        $speed = 100;
    jl_Object_monitorEnterSync($this);
    a: {
        try {
            $speedChanged = $this.$speed == $speed ? 0 : 1;
            if ($speedChanged) {
                $this.$speed = $speed;
                $this.$delegate.$setSpeed($speed);
                $this.$delay = gc_Simulation_calculateDelay($this, $speed);
                if (!$this.$paused) {
                    var$3 = $this.$interruptLock;
                    jl_Object_monitorEnterSync(var$3);
                    b: {
                        try {
                            if ($this.$delaying)
                                $this.$interrupt();
                            jl_Object_monitorExitSync(var$3);
                            break b;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$4 = $$je;

                        }
                        jl_Object_monitorExitSync(var$3);
                        $rt_throw(var$4);
                    }
                }
            }
            jl_Object_monitorExitSync($this);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;

        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$3);
    }
    if ($speedChanged)
        gc_Simulation_fireSimulationEvent($this, $this.$speedChangeEvent);
}
function gc_Simulation_calculateDelay($this, $speed) {
    var $rawDelay, $a, $delay;
    $rawDelay = Long_fromInt(100 - $speed | 0);
    $a = jl_Math_pow(333333.3333333333, 0.010101010101010102);
    $delay = Long_ZERO;
    if (Long_gt($rawDelay, Long_ZERO))
        $delay = Long_fromNumber(jl_Math_pow($a, Long_toNumber(Long_sub($rawDelay, Long_fromInt(1)))) * 30000.0);
    return $delay;
}
function gc_Simulation_getSpeed($this) {
    jl_Object_monitorEnterSync($this);
    try {
        return $this.$speed;
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gc_Simulation_delay($this) {
    var $currentTime, $timeElapsed, $actualDelay, var$4, var$5, var$6, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();$actualDelay = $thread.pop();$timeElapsed = $thread.pop();$currentTime = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $currentTime = jl_System_nanoTime();
        $timeElapsed = Long_sub($currentTime, $this.$lastDelayTime);
        $actualDelay = jl_Math_max0(Long_sub($this.$delay, $timeElapsed), Long_ZERO);
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        try {
            var$4 = $this.$interruptLock;
            $ptr = 2;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;

        }
        jl_Object_monitorExit($this);
        $rt_throw(var$4);
    case 2:
        a: {
            b: {
                try {
                    jl_Object_monitorEnter(var$4);
                    if ($rt_suspending()) {
                        break main;
                    }
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    break b;

                }
                c: {
                    d: {
                        e: {
                            try {
                                try {
                                    if (!$this.$interruptDelay)
                                        break e;
                                    $this.$interruptDelay = 0;
                                    if (!$this.$paused && !$this.$abort)
                                        break e;
                                    $this.$lastDelayTime = $currentTime;
                                    jl_Object_monitorExit(var$4);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    var$5 = $$je;
                                    break d;

                                }
                                jl_Object_monitorExit($this);
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$4 = $$je;
                                break b;

                            }
                            return;
                        }
                        try {
                            $this.$delaying = 1;
                            jl_Object_monitorExit(var$4);
                            break c;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$5 = $$je;

                        }
                    }
                    try {
                        jl_Object_monitorExit(var$4);
                        $rt_throw(var$5);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$4 = $$je;
                        break b;

                    }
                }
                try {
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$4);
        }
        if (Long_eq($actualDelay, Long_ZERO))
            try {
                var$6 = Long_ZERO;
                $ptr = 3;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                } else {
                    throw $$e;
                }
            }
        if (Long_le($actualDelay, Long_ZERO)) {
            $this.$lastDelayTime = $currentTime;
            var$4 = $this.$interruptLock;
            $ptr = 4;
            continue main;
        }
        try {
            var$6 = Long_div($actualDelay, Long_fromInt(1000000));
            $ptr = 5;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
            } else {
                throw $$e;
            }
        }
        $ptr = 6;
        continue main;
    case 3:
        a: {
            try {
                jl_Thread_sleep(var$6);
                if ($rt_suspending()) {
                    break main;
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                } else {
                    throw $$e;
                }
            }
        }
        if (Long_le($actualDelay, Long_ZERO)) {
            $this.$lastDelayTime = $currentTime;
            var$4 = $this.$interruptLock;
            $ptr = 4;
            continue main;
        }
        try {
            var$6 = Long_div($actualDelay, Long_fromInt(1000000));
            $ptr = 5;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
            } else {
                throw $$e;
            }
        }
        $ptr = 6;
        continue main;
    case 4:
        jl_Object_monitorEnter(var$4);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                jl_Thread_interrupted();
                $this.$interruptDelay = 0;
                $this.$delaying = 0;
                jl_Object_monitorExit(var$4);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$5 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExit(var$4);
        $rt_throw(var$5);
    case 5:
        a: {
            try {
                jl_Thread_sleep(var$6);
                if ($rt_suspending()) {
                    break main;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            $currentTime = jl_System_nanoTime();
            var$6 = Long_sub($currentTime, $this.$lastDelayTime);
            $actualDelay = Long_sub($this.$delay, var$6);
            if (Long_le($actualDelay, Long_ZERO)) {
                $this.$lastDelayTime = $currentTime;
                var$4 = $this.$interruptLock;
                $ptr = 4;
                continue main;
            }
            try {
                var$6 = Long_div($actualDelay, Long_fromInt(1000000));
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                } else {
                    throw $$e;
                }
            }
        }
        $ptr = 6;
    case 6:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        b: {
            c: {
                try {
                    if ($this.$enabled && !$this.$paused && !$this.$abort) {
                        jl_Object_monitorExit($this);
                        break c;
                    }
                    jl_Object_monitorExit($this);
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;

                }
                jl_Object_monitorExit($this);
                $rt_throw(var$4);
            }
            $currentTime = jl_System_nanoTime();
            var$6 = Long_sub($currentTime, $this.$lastDelayTime);
            $actualDelay = Long_sub($this.$delay, var$6);
            if (Long_gt($actualDelay, Long_ZERO)) {
                try {
                    var$6 = Long_div($actualDelay, Long_fromInt(1000000));
                    $ptr = 5;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_InterruptedException) {
                    } else {
                        throw $$e;
                    }
                }
                continue main;
            }
        }
        $this.$lastDelayTime = $currentTime;
        var$4 = $this.$interruptLock;
        $ptr = 4;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $currentTime, $timeElapsed, $actualDelay, var$4, var$5, var$6, $ptr);
}
function gc_Simulation_worldCreated($this, $e) {
    $this.$setEnabled(1);
}
function gc_Simulation_worldRemoved($this, $e) {
    var var$2, var$3, $$je;
    $this.$setEnabled(0);
    var$2 = $this.$interruptLock;
    jl_Object_monitorEnterSync(var$2);
    a: {
        try {
            if (!(!$this.$asking && !$this.$delaying))
                $this.$interrupt();
            jl_Object_monitorExitSync(var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync(var$2);
    $rt_throw(var$3);
}
function gc_Simulation__clinit_() {
    gc_Simulation_RUN_QUEUED_TASKS = $rt_s(20);
}
var jlr_Array = $rt_classWithoutFields();
function jlr_Array__init_() {
    var var_0 = new jlr_Array();
    jlr_Array__init_0(var_0);
    return var_0;
}
function jlr_Array__init_0($this) {
    jl_Object__init_0($this);
}
function jlr_Array_getLength(var$1) {
    if (var$1 === null || var$1.constructor.$meta.item === undefined) {
        $rt_throw(jl_IllegalArgumentException__init_0());
    }
    return var$1.data.length;
}
function jlr_Array_newInstance($componentType, $length) {
    if ($componentType === null)
        $rt_throw(jl_NullPointerException__init_());
    if ($componentType === $rt_cls($rt_voidcls()))
        $rt_throw(jl_IllegalArgumentException__init_0());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_());
    return jlr_Array_newInstanceImpl($componentType.$getPlatformClass(), $length);
}
function jlr_Array_newInstanceImpl(var$1, var$2) {
    if (var$1.$meta.primitive) {
        if (var$1 == $rt_bytecls()) {
            return $rt_createByteArray(var$2);
        }
        if (var$1 == $rt_shortcls()) {
            return $rt_createShortArray(var$2);
        }
        if (var$1 == $rt_charcls()) {
            return $rt_createCharArray(var$2);
        }
        if (var$1 == $rt_intcls()) {
            return $rt_createIntArray(var$2);
        }
        if (var$1 == $rt_longcls()) {
            return $rt_createLongArray(var$2);
        }
        if (var$1 == $rt_floatcls()) {
            return $rt_createFloatArray(var$2);
        }
        if (var$1 == $rt_doublecls()) {
            return $rt_createDoubleArray(var$2);
        }
        if (var$1 == $rt_booleancls()) {
            return $rt_createBooleanArray(var$2);
        }
    } else {
        return $rt_createArray(var$1, var$2)
    }
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0() {
    jl_Object.call(this);
    this.$_08 = null;
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_(var_0) {
    var var_1 = new jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0();
    jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_08 = var$1;
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0_run(var$0) {
    jl_Object$NotifyListenerImpl_lambda$interrupted$3(var$0.$_08);
}
var gu_GreenfootUtil = $rt_classWithoutFields();
var gu_GreenfootUtil_delegate = null;
var gu_GreenfootUtil_imageCache = null;
var gu_GreenfootUtil_mp3available = 0;
function gu_GreenfootUtil_$callClinit() {
    gu_GreenfootUtil_$callClinit = $rt_eraseClinit(gu_GreenfootUtil);
    gu_GreenfootUtil__clinit_();
}
function gu_GreenfootUtil__init_() {
    var var_0 = new gu_GreenfootUtil();
    gu_GreenfootUtil__init_0(var_0);
    return var_0;
}
function gu_GreenfootUtil__init_0($this) {
    gu_GreenfootUtil_$callClinit();
    jl_Object__init_0($this);
}
function gu_GreenfootUtil_initialise($newDelegate) {
    gu_GreenfootUtil_$callClinit();
    gu_GreenfootUtil_delegate = $newDelegate;
    gu_GreenfootUtil_imageCache = gc_ImageCache_getInstance();
}
function gu_GreenfootUtil_getGreenfootLogoPath() {
    gu_GreenfootUtil_$callClinit();
    return gu_GreenfootUtil_delegate.$getGreenfootLogoPath();
}
function gu_GreenfootUtil_addCachedImage($name, $image) {
    gu_GreenfootUtil_$callClinit();
    return gu_GreenfootUtil_imageCache.$addCachedImage($name, $image);
}
function gu_GreenfootUtil_getCachedImage($name) {
    gu_GreenfootUtil_$callClinit();
    return gu_GreenfootUtil_imageCache.$getCachedImage($name);
}
function gu_GreenfootUtil_getLines($string) {
    var $lines, $i, $p, var$5;
    gu_GreenfootUtil_$callClinit();
    $lines = ju_ArrayList__init_();
    $i = $string.$indexOf(10);
    $p = 0;
    while ($i != (-1)) {
        var$5 = $i <= $p ? $i : $string.$charAt($i - 1 | 0) != 13 ? $i : $i + (-1) | 0;
        $lines.$add($string.$substring($p, var$5));
        $p = $i + 1 | 0;
        $i = $string.$indexOf0(10, $p);
    }
    if ($p < $string.$length())
        $lines.$add($string.$substring0($p));
    return $lines;
}
function gu_GreenfootUtil__clinit_() {
    gu_GreenfootUtil_mp3available = 0;
}
var ju_ListIterator = $rt_classWithoutFields(0);
function otcit_DoubleAnalyzer$Result() {
    var a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign = 0;
}
function otcit_DoubleAnalyzer$Result__init_() {
    var var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
}
function otcit_DoubleAnalyzer$Result__init_0($this) {
    jl_Object__init_0($this);
}
var ju_Random = $rt_classWithoutFields();
function ju_Random__init_() {
    var var_0 = new ju_Random();
    ju_Random__init_0(var_0);
    return var_0;
}
function ju_Random__init_0($this) {
    jl_Object__init_0($this);
}
var otpp_ResourceAccessor = $rt_classWithoutFields();
function otpp_ResourceAccessor__init_() {
    var var_0 = new otpp_ResourceAccessor();
    otpp_ResourceAccessor__init_0(var_0);
    return var_0;
}
function otpp_ResourceAccessor__init_0($this) {
    jl_Object__init_0($this);
}
var jl_NoSuchFieldError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchFieldError__init_() {
    var var_0 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_0);
    return var_0;
}
function jl_NoSuchFieldError__init_1(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_2(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this) {
    jl_IncompatibleClassChangeError__init_0($this);
}
function jl_NoSuchFieldError__init_2($this, $message) {
    jl_IncompatibleClassChangeError__init_2($this, $message);
}
var jl_Iterable = $rt_classWithoutFields(0);
var ju_Collection = $rt_classWithoutFields(0);
var ju_AbstractCollection = $rt_classWithoutFields();
function ju_AbstractCollection__init_($this) {
    jl_Object__init_0($this);
}
function ju_AbstractCollection_isEmpty($this) {
    return $this.$size0() ? 0 : 1;
}
function ju_AbstractCollection_toArray($this, $a) {
    var var$2, $i, var$4, $iter;
    var$2 = $a.data;
    $i = $this.$size0();
    var$4 = var$2.length;
    if (var$4 < $i)
        $a = jlr_Array_newInstance((jl_Object_getClass($a)).$getComponentType(), $i);
    else
        while ($i < var$4) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        var$2 = $a.data;
        var$4 = $i + 1 | 0;
        var$2[$i] = $iter.$next1();
        $i = var$4;
    }
    return $a;
}
function ju_AbstractCollection_remove($this, $o) {
    var $iter, $e;
    $iter = $this.$iterator();
    a: {
        while ($iter.$hasNext()) {
            b: {
                $e = $iter.$next1();
                if ($e !== null) {
                    if (!$e.$equals($o))
                        break b;
                    else
                        break a;
                }
                if ($o === null)
                    break a;
            }
        }
        return 0;
    }
    $iter.$remove();
    return 1;
}
var gu_GraphicsUtilities = $rt_classWithoutFields();
function gu_GraphicsUtilities__init_() {
    var var_0 = new gu_GraphicsUtilities();
    gu_GraphicsUtilities__init_0(var_0);
    return var_0;
}
function gu_GraphicsUtilities__init_0($this) {
    jl_Object__init_0($this);
}
function gu_GraphicsUtilities_getFontHeightPx($fontString) {
    var $doc, $tspan, var$4, $tdiv, $textHeight;
    $doc = otjdh_HTMLDocument_current();
    $tspan = $doc.createElement("span");
    $tspan.style.setProperty("font", $rt_ustr($fontString));
    var$4 = "MMM";
    $tspan.innerHTML = var$4;
    $tdiv = $doc.createElement("div");
    $tdiv.style.setProperty("position", "absolute");
    $tdiv.style.setProperty("overflow", "hidden");
    $tdiv.style.setProperty("max-width", "0");
    $tdiv.appendChild($tspan);
    $doc.body.appendChild($tdiv);
    $textHeight = $tspan.scrollHeight;
    if (!$textHeight)
        $textHeight = $tdiv.scrollHeight;
    $doc.body.removeChild($tdiv);
    return $textHeight;
}
function gu_GraphicsUtilities_getFontMetricsPx($fontString) {
    var $doc, $tdiv, $idiv, $tspan, var$6, $baselineDiv, $textHeight, $baseLine;
    $doc = otjdh_HTMLDocument_current();
    $tdiv = $doc.createElement("div");
    $tdiv.style.setProperty("position", "absolute");
    $tdiv.style.setProperty("overflow", "hidden");
    $tdiv.style.setProperty("max-width", "0");
    $idiv = $doc.createElement("div");
    $idiv.style.setProperty("min-width", "10em");
    $tspan = $doc.createElement("span");
    $tspan.style.setProperty("font", $rt_ustr($fontString));
    var$6 = "MMM";
    $tspan.innerHTML = var$6;
    $tdiv.appendChild($idiv);
    $idiv.appendChild($tspan);
    $doc.body.appendChild($tdiv);
    $baselineDiv = $doc.createElement("div");
    $baselineDiv.style.setProperty("display", "inline-block");
    $baselineDiv.style.setProperty("vertical-align", "baseline");
    $baselineDiv.style.setProperty("width", "1px");
    $baselineDiv.style.setProperty("height", "1px");
    $idiv.appendChild($baselineDiv);
    $textHeight = $tspan.scrollHeight;
    if (!$textHeight)
        $textHeight = $tdiv.scrollHeight;
    $baseLine = ($baselineDiv.offsetTop - $idiv.offsetTop | 0) + 1 | 0;
    $doc.body.removeChild($tdiv);
    return $rt_createIntArrayFromData([$textHeight, $baseLine]);
}
function ji_ByteArrayInputStream() {
    var a = this; ji_InputStream.call(a);
    a.$buf0 = null;
    a.$pos0 = 0;
    a.$mark1 = 0;
    a.$count1 = 0;
}
function ji_ByteArrayInputStream__init_(var_0, var_1, var_2) {
    var var_3 = new ji_ByteArrayInputStream();
    ji_ByteArrayInputStream__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function ji_ByteArrayInputStream__init_1(var_0) {
    var var_1 = new ji_ByteArrayInputStream();
    ji_ByteArrayInputStream__init_2(var_1, var_0);
    return var_1;
}
function ji_ByteArrayInputStream__init_0($this, $buf, $offset, $length) {
    ji_InputStream__init_($this);
    $this.$buf0 = $buf;
    $this.$pos0 = $offset;
    $this.$mark1 = $offset;
    $this.$count1 = $offset + $length | 0;
}
function ji_ByteArrayInputStream__init_2($this, $buf) {
    ji_ByteArrayInputStream__init_0($this, $buf, 0, $buf.data.length);
}
function ji_ByteArrayInputStream_read($this, $b, $off, $len) {
    var $bytesToRead, $i, var$6, var$7, var$8, var$9;
    $bytesToRead = jl_Math_min($len, $this.$count1 - $this.$pos0 | 0);
    $i = 0;
    while ($i < $bytesToRead) {
        var$6 = $b.data;
        var$7 = $off + 1 | 0;
        var$8 = $this.$buf0.data;
        var$9 = $this.$pos0;
        $this.$pos0 = var$9 + 1 | 0;
        var$6[$off] = var$8[var$9];
        $i = $i + 1 | 0;
        $off = var$7;
    }
    if ($bytesToRead <= 0)
        $bytesToRead = (-1);
    return $bytesToRead;
}
var otci_IntegerUtil = $rt_classWithoutFields();
function otci_IntegerUtil__init_() {
    var var_0 = new otci_IntegerUtil();
    otci_IntegerUtil__init_0(var_0);
    return var_0;
}
function otci_IntegerUtil__init_0($this) {
    jl_Object__init_0($this);
}
function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
    var $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(21);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit($value >>> $pos & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
}
var jl_InstantiationException = $rt_classWithoutFields(jl_ReflectiveOperationException);
function jl_InstantiationException__init_() {
    var var_0 = new jl_InstantiationException();
    jl_InstantiationException__init_0(var_0);
    return var_0;
}
function jl_InstantiationException__init_0($this) {
    jl_ReflectiveOperationException__init_0($this);
}
var jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0);
var jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields();
function jl_DefaultUncaughtExceptionHandler__init_() {
    var var_0 = new jl_DefaultUncaughtExceptionHandler();
    jl_DefaultUncaughtExceptionHandler__init_0(var_0);
    return var_0;
}
function jl_DefaultUncaughtExceptionHandler__init_0($this) {
    jl_Object__init_0($this);
}
function jl_DefaultUncaughtExceptionHandler_uncaughtException($this, $t, $e) {
    $e.$printStackTrace0();
}
var jl_Readable = $rt_classWithoutFields(0);
var g_ImageVisitor = $rt_classWithoutFields();
function g_ImageVisitor__init_() {
    var var_0 = new g_ImageVisitor();
    g_ImageVisitor__init_0(var_0);
    return var_0;
}
function g_ImageVisitor__init_0($this) {
    jl_Object__init_0($this);
}
function g_ImageVisitor_drawImageToCanvas($image, $g2d, $x, $y) {
    $image.$drawToCanvas($g2d, $x, $y);
}
var otji_JS = $rt_classWithoutFields();
function otji_JS__init_() {
    var var_0 = new otji_JS();
    otji_JS__init_0(var_0);
    return var_0;
}
function otji_JS__init_0($this) {
    jl_Object__init_0($this);
}
function otji_JS_function(var$1, var$2) {
    var name = 'jso$functor$' + var$2;
    if (!var$1[name]) {
        var fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        var$1[name] = function() {
            return fn;
        };
    }
    return var$1[name]();
}
function otji_JS_functionAsObject(var$1, var$2) {
    if (typeof var$1 !== "function") return var$1;
    var result = {};
    result[var$2] = var$1;
    return result;
}
var jn_URLStreamHandlerFactory = $rt_classWithoutFields(0);
var otciu_UnicodeHelper = $rt_classWithoutFields();
function otciu_UnicodeHelper__init_() {
    var var_0 = new otciu_UnicodeHelper();
    otciu_UnicodeHelper__init_0(var_0);
    return var_0;
}
function otciu_UnicodeHelper__init_0($this) {
    jl_Object__init_0($this);
}
function otciu_UnicodeHelper_decodeIntPairsDiff($text) {
    var $flow, $sz, $data, $j, $lastKey, $lastValue, $i, var$9, var$10;
    $flow = otci_CharFlow__init_($text.$toCharArray());
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    $j = 0;
    $lastKey = 0;
    $lastValue = 0;
    $i = 0;
    while ($i < $sz) {
        var$9 = $data.data;
        $lastKey = $lastKey + otci_Base46_decode($flow) | 0;
        $lastValue = $lastValue + otci_Base46_decode($flow) | 0;
        var$10 = $j + 1 | 0;
        var$9[$j] = $lastKey;
        $j = var$10 + 1 | 0;
        var$9[var$10] = $lastValue;
        $i = $i + 1 | 0;
    }
    return $data;
}
function otciu_UnicodeHelper_decodeCaseMapping($text) {
    var $flow, $sz, $data, $last, $i, var$7, var$8;
    $flow = otci_CharFlow__init_($text.$toCharArray());
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    $last = 0;
    $i = 0;
    while ($i < $sz) {
        var$7 = $data.data;
        $last = $last + otci_Base46_decodeUnsigned($flow) | 0;
        var$8 = $i * 2 | 0;
        var$7[var$8] = $last;
        var$7[var$8 + 1 | 0] = otci_Base46_decode($flow);
        $i = $i + 1 | 0;
    }
    return $data;
}
function otciu_UnicodeHelper_decodeByte($c) {
    if ($c > 92)
        return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
    if ($c <= 34)
        return ($c - 32 | 0) << 24 >> 24;
    return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
}
function otciu_UnicodeHelper_extractRle($encoded) {
    var $ranges, $buffer, $index, $rangeIndex, $codePoint, $i, $b, $count, $pos, $j, $digit, var$13, var$14, var$15, var$16, var$17;
    $ranges = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
    $buffer = $rt_createByteArray(16384);
    $index = 0;
    $rangeIndex = 0;
    $codePoint = 0;
    $i = 0;
    while ($i < $encoded.$length()) {
        $b = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
        if ($b == 64) {
            $i = $i + 1 | 0;
            $b = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
            $count = 0;
            $pos = 1;
            $j = 0;
            while ($j < 3) {
                $i = $i + 1 | 0;
                $digit = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
                $count = $count | $rt_imul($pos, $digit);
                $pos = $pos * 64 | 0;
                $j = $j + 1 | 0;
            }
        } else if ($b < 32)
            $count = 1;
        else {
            $b = ($b - 32 | 0) << 24 >> 24;
            $i = $i + 1 | 0;
            $count = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
        }
        if (!$b && $count >= 128) {
            if ($index > 0) {
                var$13 = $ranges.data;
                var$14 = $rangeIndex + 1 | 0;
                var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf0($buffer, $index));
                $rangeIndex = var$14;
            }
            $codePoint = $codePoint + ($index + $count | 0) | 0;
            $index = 0;
        } else {
            var$15 = $buffer.data;
            var$14 = $index + $count | 0;
            if (var$14 < var$15.length)
                var$16 = $rangeIndex;
            else {
                var$13 = $ranges.data;
                var$16 = $rangeIndex + 1 | 0;
                var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf0($buffer, $index));
                $codePoint = $codePoint + var$14 | 0;
                $index = 0;
            }
            while (true) {
                var$14 = $count + (-1) | 0;
                if ($count <= 0)
                    break;
                var$17 = $index + 1 | 0;
                var$15[$index] = $b;
                $index = var$17;
                $count = var$14;
            }
            $rangeIndex = var$16;
        }
        $i = $i + 1 | 0;
    }
    return ju_Arrays_copyOf1($ranges, $rangeIndex);
}
function jl_Object$monitorEnterWait$lambda$_6_0() {
    var a = this; jl_Object.call(a);
    a.$_09 = null;
    a.$_14 = null;
    a.$_20 = 0;
    a.$_3 = null;
}
function jl_Object$monitorEnterWait$lambda$_6_0__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jl_Object$monitorEnterWait$lambda$_6_0();
    jl_Object$monitorEnterWait$lambda$_6_0__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jl_Object$monitorEnterWait$lambda$_6_0__init_0(var$0, var$1, var$2, var$3, var$4) {
    jl_Object__init_0(var$0);
    var$0.$_09 = var$1;
    var$0.$_14 = var$2;
    var$0.$_20 = var$3;
    var$0.$_3 = var$4;
}
function jl_Object$monitorEnterWait$lambda$_6_0_run(var$0) {
    jl_Object_lambda$monitorEnterWait$0(var$0.$_09, var$0.$_14, var$0.$_20, var$0.$_3);
}
var ju_Objects = $rt_classWithoutFields();
function ju_Objects__init_() {
    var var_0 = new ju_Objects();
    ju_Objects__init_0(var_0);
    return var_0;
}
function ju_Objects__init_0($this) {
    jl_Object__init_0($this);
}
function ju_Objects_equals($a, $b) {
    if ($a === $b)
        return 1;
    return $a !== null ? $a.$equals($b) : $b !== null ? 0 : 1;
}
function ju_Objects_requireNonNull($obj) {
    return ju_Objects_requireNonNull0($obj, $rt_s(22));
}
function ju_Objects_requireNonNull0($obj, $message) {
    if ($obj !== null)
        return $obj;
    $rt_throw(jl_NullPointerException__init_0($message));
}
function g_GreenfootImage$2() {
    var a = this; jl_Object.call(a);
    a.$val$sync = null;
    a.$val$success = null;
    a.$this$00 = null;
}
function g_GreenfootImage$2__init_(var_0, var_1, var_2) {
    var var_3 = new g_GreenfootImage$2();
    g_GreenfootImage$2__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_GreenfootImage$2__init_0($this, $this$0, var$2, var$3) {
    $this.$this$00 = $this$0;
    $this.$val$sync = var$2;
    $this.$val$success = var$3;
    jl_Object__init_0($this);
}
function g_GreenfootImage$2_handleEvent($this, $arg0) {
    var var$2;
    var$2 = jl_Thread__init_3(g_GreenfootImage$2$handleEvent$lambda$_1_0__init_($this.$val$sync, $this.$val$success));
    var$2.$start();
}
function g_GreenfootImage$2_lambda$handleEvent$0($sync, $success) {
    var var$3, $$je;
    jl_Object_monitorEnterSync($sync);
    a: {
        try {
            $success.data[0] = 0;
            jl_Object_notify($sync);
            jl_Object_monitorExitSync($sync);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($sync);
    $rt_throw(var$3);
}
function g_GreenfootImage$2_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function ju_HashMap$HashEntry() {
    var a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next2 = null;
}
function ju_HashMap$HashEntry__init_(var_0, var_1) {
    var var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap$HashEntry__init_0($this, $theKey, $hash) {
    ju_MapEntry__init_0($this, $theKey, null);
    $this.$origKeyHash = $hash;
}
function g_GreenfootImage$1() {
    var a = this; jl_Object.call(a);
    a.$val$sync0 = null;
    a.$val$success0 = null;
    a.$this$01 = null;
}
function g_GreenfootImage$1__init_(var_0, var_1, var_2) {
    var var_3 = new g_GreenfootImage$1();
    g_GreenfootImage$1__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_GreenfootImage$1__init_0($this, $this$0, var$2, var$3) {
    $this.$this$01 = $this$0;
    $this.$val$sync0 = var$2;
    $this.$val$success0 = var$3;
    jl_Object__init_0($this);
}
function g_GreenfootImage$1_handleEvent($this, $arg0) {
    var var$2;
    var$2 = jl_Thread__init_3(g_GreenfootImage$1$handleEvent$lambda$_1_0__init_($this.$val$sync0, $this.$val$success0));
    var$2.$start();
}
function g_GreenfootImage$1_lambda$handleEvent$0($sync, $success) {
    var var$3, $$je;
    jl_Object_monitorEnterSync($sync);
    a: {
        try {
            $success.data[0] = 1;
            jl_Object_notify($sync);
            jl_Object_monitorExitSync($sync);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($sync);
    $rt_throw(var$3);
}
function g_GreenfootImage$1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jnc_CharsetEncoder() {
    var a = this; jl_Object.call(a);
    a.$charset = null;
    a.$replacement = null;
    a.$averageBytesPerChar = 0.0;
    a.$maxBytesPerChar = 0.0;
    a.$malformedAction = null;
    a.$unmappableAction = null;
    a.$status = 0;
}
function jnc_CharsetEncoder__init_($this, $cs, $averageBytesPerChar, $maxBytesPerChar, $replacement) {
    jl_Object__init_0($this);
    jnc_CodingErrorAction_$callClinit();
    $this.$malformedAction = jnc_CodingErrorAction_REPORT;
    $this.$unmappableAction = jnc_CodingErrorAction_REPORT;
    jnc_CharsetEncoder_checkReplacement($this, $replacement);
    $this.$charset = $cs;
    $this.$replacement = $replacement.$clone();
    $this.$averageBytesPerChar = $averageBytesPerChar;
    $this.$maxBytesPerChar = $maxBytesPerChar;
}
function jnc_CharsetEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar) {
    var var$4;
    var$4 = $rt_createByteArray(1);
    var$4.data[0] = 63;
    jnc_CharsetEncoder__init_($this, $cs, $averageBytesPerChar, $maxBytesPerChar, var$4);
}
function jnc_CharsetEncoder_checkReplacement($this, $replacement) {
    var var$2;
    if ($replacement !== null) {
        var$2 = $replacement.data.length;
        if (var$2 && var$2 >= $this.$maxBytesPerChar)
            return;
    }
    $rt_throw(jl_IllegalArgumentException__init_1($rt_s(23)));
}
function jnc_CharsetEncoder_onMalformedInput($this, $newAction) {
    if ($newAction !== null) {
        $this.$malformedAction = $newAction;
        $this.$implOnMalformedInput($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_1($rt_s(24)));
}
function jnc_CharsetEncoder_implOnMalformedInput($this, $newAction) {}
function jnc_CharsetEncoder_onUnmappableCharacter($this, $newAction) {
    if ($newAction !== null) {
        $this.$unmappableAction = $newAction;
        $this.$implOnUnmappableCharacter($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_1($rt_s(24)));
}
function jnc_CharsetEncoder_implOnUnmappableCharacter($this, $newAction) {}
function jnc_CharsetEncoder_encode($this, $in, $out, $endOfInput) {
    var $result, $e, $remaining, $action, $$je;
    a: {
        if ($this.$status != 3) {
            if ($endOfInput)
                break a;
            if ($this.$status != 2)
                break a;
        }
        $rt_throw(jl_IllegalStateException__init_0());
    }
    $this.$status = !$endOfInput ? 1 : 2;
    while (true) {
        try {
            $result = $this.$encodeLoop($in, $out);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_RuntimeException) {
                $e = $$je;
                $rt_throw(jnc_CoderMalfunctionError__init_($e));
            } else {
                throw $$e;
            }
        }
        if ($result.$isUnderflow()) {
            if (!$endOfInput)
                return $result;
            $remaining = jn_Buffer_remaining($in);
            if ($remaining <= 0)
                return $result;
            $result = jnc_CoderResult_malformedForLength($remaining);
        } else if ($result.$isOverflow())
            break;
        $action = !$result.$isUnmappable() ? $this.$malformedAction : $this.$unmappableAction;
        b: {
            jnc_CodingErrorAction_$callClinit();
            if ($action !== jnc_CodingErrorAction_REPLACE) {
                if ($action === jnc_CodingErrorAction_IGNORE)
                    break b;
                else
                    return $result;
            }
            if (jn_Buffer_remaining($out) < $this.$replacement.data.length)
                return jnc_CoderResult_OVERFLOW;
            jn_ByteBuffer_put($out, $this.$replacement);
        }
        $in.$position0(jn_Buffer_position($in) + $result.$length() | 0);
    }
    return $result;
}
function jnc_CharsetEncoder_flush($this, $out) {
    var $result;
    if ($this.$status != 2 && $this.$status != 4)
        $rt_throw(jl_IllegalStateException__init_0());
    $result = $this.$implFlush($out);
    jnc_CoderResult_$callClinit();
    if ($result === jnc_CoderResult_UNDERFLOW)
        $this.$status = 3;
    return $result;
}
function jnc_CharsetEncoder_implFlush($this, $out) {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult_UNDERFLOW;
}
var otjb_Performance = $rt_classWithoutFields();
function otjb_Performance__init_() {
    var var_0 = new otjb_Performance();
    otjb_Performance__init_0(var_0);
    return var_0;
}
function otjb_Performance__init_0($this) {
    jl_Object__init_0($this);
}
function g_World() {
    var a = this; jl_Object.call(a);
    a.$collisionChecker = null;
    a.$objectsDisordered = null;
    a.$objectsInPaintOrder = null;
    a.$objectsInActOrder = null;
    a.$textLabels = null;
    a.$cellSize = 0;
    a.$width = 0;
    a.$height = 0;
    a.$backgroundImage = null;
    a.$backgroundIsClassImage = 0;
    a.$isBounded0 = 0;
}
var g_World_DEFAULT_BACKGROUND_COLOR = null;
function g_World_$callClinit() {
    g_World_$callClinit = $rt_eraseClinit(g_World);
    g_World__clinit_();
}
function g_World__init_($this, $worldWidth, $worldHeight, $cellSize) {
    var var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();$cellSize = $thread.pop();$worldHeight = $thread.pop();$worldWidth = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_World_$callClinit();
        var$4 = 1;
        $ptr = 1;
    case 1:
        g_World__init_0($this, $worldWidth, $worldHeight, $cellSize, var$4);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $worldWidth, $worldHeight, $cellSize, var$4, $ptr);
}
function g_World__init_0($this, $worldWidth, $worldHeight, $cellSize, $bounded) {
    var var$5, $wHandler, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$wHandler = $thread.pop();var$5 = $thread.pop();$bounded = $thread.pop();$cellSize = $thread.pop();$worldHeight = $thread.pop();$worldWidth = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_World_$callClinit();
        jl_Object__init_0($this);
        $this.$collisionChecker = gc_ColManager__init_();
        $this.$objectsDisordered = g_TreeActorSet__init_();
        $this.$textLabels = ju_ArrayList__init_();
        $this.$cellSize = 1;
        $this.$backgroundIsClassImage = 1;
        g_World_initialize($this, $worldWidth, $worldHeight, $cellSize);
        $this.$isBounded0 = $bounded;
        $this.$backgroundIsClassImage = 1;
        $ptr = 1;
    case 1:
        $tmp = g_World_getClassImage($this);
        if ($rt_suspending()) {
            break main;
        }
        var$5 = $tmp;
        g_World_setBackground($this, var$5);
        $wHandler = gc_WorldHandler_getInstance();
        if ($wHandler !== null)
            $wHandler.$setInitialisingWorld($this);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $worldWidth, $worldHeight, $cellSize, $bounded, var$5, $wHandler, $ptr);
}
function g_World_setBackground($this, $image) {
    var $imgWidth, $imgHeight, $worldWidth, $worldHeight, $tile, $x, $y;
    if ($image === null) {
        $this.$backgroundIsClassImage = 0;
        $this.$backgroundImage = null;
    } else {
        $imgWidth = $image.$getWidth();
        $imgHeight = $image.$getHeight();
        $worldWidth = $this.$getWidthInPixels();
        $worldHeight = $this.$getHeightInPixels();
        $tile = $imgWidth >= $worldWidth && $imgHeight >= $worldHeight ? 0 : 1;
        if (!$tile)
            $this.$backgroundImage = $image;
        else {
            $this.$backgroundIsClassImage = 0;
            $this.$backgroundImage = g_GreenfootImage__init_0($worldWidth, $worldHeight);
            $this.$backgroundImage.$setColor(g_World_DEFAULT_BACKGROUND_COLOR);
            $this.$backgroundImage.$fill();
            $x = 0;
            while ($x < $worldWidth) {
                $y = 0;
                while ($y < $worldHeight) {
                    $this.$backgroundImage.$drawImage($image, $x, $y);
                    $y = $y + $imgHeight | 0;
                }
                $x = $x + $imgWidth | 0;
            }
        }
    }
}
function g_World_getBackground($this) {
    if ($this.$backgroundImage === null) {
        $this.$backgroundImage = g_GreenfootImage__init_0($this.$getWidthInPixels(), $this.$getHeightInPixels());
        $this.$backgroundImage.$setColor(g_World_DEFAULT_BACKGROUND_COLOR);
        $this.$backgroundImage.$fill();
        $this.$backgroundIsClassImage = 0;
    } else if ($this.$backgroundIsClassImage) {
        $this.$backgroundImage = $this.$backgroundImage.$getCopyOnWriteClone();
        $this.$backgroundIsClassImage = 0;
    }
    return $this.$backgroundImage;
}
function g_World_getWidth($this) {
    return $this.$width;
}
function g_World_getHeight($this) {
    return $this.$height;
}
function g_World_getCellSize($this) {
    return $this.$cellSize;
}
function g_World_addObject($this, $object, $x, $y) {
    var $whInstance;
    if ($object.$world !== null) {
        if ($object.$world === $this)
            return;
        $object.$world.$removeObject($object);
    }
    $this.$objectsDisordered.$add0($object);
    g_World_addInPaintOrder($this, $object);
    g_World_addInActOrder($this, $object);
    $object.$addToWorld($x, $y, $this);
    $this.$collisionChecker.$addObject($object);
    $object.$addedToWorld($this);
    $whInstance = gc_WorldHandler_getInstance();
    if ($whInstance !== null)
        (gc_WorldHandler_getInstance()).$objectAddedToWorld($object);
}
function g_World_removeObject($this, $object) {
    if ($object !== null && $object.$world === $this) {
        $this.$objectsDisordered.$remove1($object);
        $this.$collisionChecker.$removeObject($object);
        if ($this.$objectsDisordered !== $this.$objectsInActOrder && $this.$objectsInActOrder !== null)
            $this.$objectsInActOrder.$remove1($object);
        else if ($this.$objectsDisordered !== $this.$objectsInPaintOrder && $this.$objectsInPaintOrder !== null)
            $this.$objectsInPaintOrder.$remove1($object);
        $object.$setWorld(null);
        return;
    }
}
function g_World_getObjects($this, $cls) {
    var $result, $i, $actor;
    $result = ju_ArrayList__init_();
    $i = $this.$objectsDisordered.$iterator();
    while ($i.$hasNext()) {
        $actor = $i.$next1();
        if (!($cls !== null && !$cls.$isInstance($actor)))
            $result.$add($actor);
    }
    return $result;
}
function g_World_act($this) {}
function g_World_started($this) {}
function g_World_stopped($this) {}
function g_World_showText($this, $text, $x, $y) {
    var $i, $label;
    $i = $this.$textLabels.$iterator();
    a: {
        while (true) {
            if (!$i.$hasNext())
                break a;
            $label = $i.$next1();
            if ($label.$getX() == $x && $label.$getY() == $y)
                break;
        }
        if (($label.$getText()).$equals($text))
            return;
        $i.$remove();
    }
    if ($text !== null && $text.$length())
        $this.$textLabels.$add(gc_TextLabel__init_($text, $x, $y));
}
function g_World_isBounded($this) {
    return $this.$isBounded0;
}
function g_World_getHeightInPixels($this) {
    return $rt_imul($this.$height, $this.$cellSize);
}
function g_World_getWidthInPixels($this) {
    return $rt_imul($this.$width, $this.$cellSize);
}
function g_World_toCellFloor($this, $pixel) {
    return jl_Math_floor($pixel / $this.$cellSize) | 0;
}
function g_World_getObjectsAtPixel($this, $x, $y) {
    var $result, $objects, var$5, $actor, $bounds;
    $result = ju_LinkedList__init_();
    $objects = $this.$getObjectsListInPaintOrder();
    var$5 = $objects.$iterator();
    while (var$5.$hasNext()) {
        $actor = var$5.$next1();
        $bounds = $actor.$getBoundingRect();
        if ($x >= gci_Rect_getX($bounds) && $x <= gci_Rect_getRight($bounds) && $y >= gci_Rect_getY($bounds) && $y <= gci_Rect_getTop($bounds) && $actor.$containsPoint($x, $y))
            $result.$add($actor);
    }
    return $result;
}
function g_World_updateObjectLocation($this, $object, $oldX, $oldY) {
    $this.$collisionChecker.$updateObjectLocation($object, $oldX, $oldY);
}
function g_World_updateObjectSize($this, $object) {
    $this.$collisionChecker.$updateObjectSize($object);
}
function g_World_startSequence($this) {
    $this.$collisionChecker.$startSequence();
}
function g_World_getOneIntersectingObject($this, $object, $cls) {
    return $this.$collisionChecker.$getOneIntersectingObject($object, $cls);
}
function g_World_getObjectsListInPaintOrder($this) {
    if ($this.$objectsInPaintOrder === null)
        return $this.$objectsDisordered;
    return $this.$objectsInPaintOrder;
}
function g_World_getObjectsListInActOrder($this) {
    if ($this.$objectsInActOrder === null)
        return $this.$objectsDisordered;
    return $this.$objectsInActOrder;
}
function g_World_initialize($this, $width, $height, $cellSize) {
    $this.$width = $width;
    $this.$height = $height;
    $this.$cellSize = $cellSize;
    $this.$collisionChecker.$initialize0($width, $height, $cellSize, 0);
}
function g_World_getClassImage($this) {
    var $clazz, $image, var$3, var$4, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$image = $thread.pop();$clazz = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $clazz = jl_Object_getClass($this);
        while (true) {
            if ($clazz === null)
                return null;
            $image = null;
            try {
                var$3 = g_Actor_getDelegate();
                var$4 = $clazz.$getName();
                $ptr = 1;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
            if (var$3 !== null)
                break;
            $clazz = $clazz.$getSuperclass();
        }
        return var$3;
    case 1:
        a: {
            try {
                $tmp = var$3.$getImage0(var$4);
                if ($rt_suspending()) {
                    break main;
                }
                var$3 = $tmp;
                $image = var$3;
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
        }
        while (var$3 === null) {
            $clazz = $clazz.$getSuperclass();
            if ($clazz === null)
                return null;
            $image = null;
            try {
                var$3 = g_Actor_getDelegate();
                var$4 = $clazz.$getName();
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
        }
        return var$3;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $clazz, $image, var$3, var$4, $ptr);
}
function g_World_addInActOrder($this, $object) {
    if ($this.$objectsInActOrder !== null)
        $this.$objectsInActOrder.$add0($object);
}
function g_World_addInPaintOrder($this, $object) {
    if ($this.$objectsInPaintOrder !== null)
        $this.$objectsInPaintOrder.$add0($object);
}
function g_World__clinit_() {
    g_Color_$callClinit();
    g_World_DEFAULT_BACKGROUND_COLOR = g_Color_WHITE;
}
var loose = $rt_classWithoutFields(g_World);
function loose__init_() {
    var var_0 = new loose();
    loose__init_0(var_0);
    return var_0;
}
function loose__init_0($this) {
    var var$1, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = 600;
        var$2 = 400;
        var$3 = 1;
        $ptr = 1;
    case 1:
        g_World__init_($this, var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$showText($rt_s(25), 300, 150);
        $this.$showText($rt_s(26), 300, 200);
        $this.$showText($rt_s(27), 300, 250);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, $ptr);
}
function loose_act($this) {
    var $world3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$world3 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (g_Greenfoot_isKeyDown($rt_s(28))) {
            $world3 = new game;
            $ptr = 1;
            continue main;
        }
        if (!g_Greenfoot_isKeyDown($rt_s(29)))
            return;
        $world3 = new MyWorld;
        $ptr = 2;
        continue main;
    case 1:
        game__init_($world3);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setWorld($world3);
        if (!g_Greenfoot_isKeyDown($rt_s(29)))
            return;
        $world3 = new MyWorld;
        $ptr = 2;
    case 2:
        MyWorld__init_($world3);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setWorld($world3);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $world3, $ptr);
}
function gj_Client$lambda$new$1$lambda$_22_0() {
    jl_Object.call(this);
    this.$_010 = null;
}
function gj_Client$lambda$new$1$lambda$_22_0__init_(var_0) {
    var var_1 = new gj_Client$lambda$new$1$lambda$_22_0();
    gj_Client$lambda$new$1$lambda$_22_0__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$lambda$new$1$lambda$_22_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_010 = var$1;
}
function gj_Client$lambda$new$1$lambda$_22_0_run(var$0) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = var$0.$_010;
        $ptr = 1;
    case 1:
        gj_Client_lambda$new$0(var$1);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$0, var$1, $ptr);
}
var ju_Queue = $rt_classWithoutFields(0);
var jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException);
function jl_ArrayStoreException__init_() {
    var var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
}
function jl_ArrayStoreException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jn_ByteBuffer() {
    var a = this; jn_Buffer.call(a);
    a.$start0 = 0;
    a.$array = null;
    a.$order = null;
}
function jn_ByteBuffer__init_($this, $start, $capacity, $array, $position, $limit) {
    jn_Buffer__init_($this, $capacity);
    jn_ByteOrder_$callClinit();
    $this.$order = jn_ByteOrder_BIG_ENDIAN;
    $this.$start0 = $start;
    $this.$array = $array;
    $this.$position = $position;
    $this.$limit = $limit;
}
function jn_ByteBuffer_wrap($array, $offset, $length) {
    return jn_ByteBufferImpl__init_(0, $array.data.length, $array, $offset, $offset + $length | 0, 0, 0);
}
function jn_ByteBuffer_wrap0($array) {
    return jn_ByteBuffer_wrap($array, 0, $array.data.length);
}
function jn_ByteBuffer_put0($this, $src, $offset, $length) {
    var var$4, var$5, var$6, var$7, var$8, $pos, $i, var$11;
    if (!$length)
        return $this;
    if ($this.$isReadOnly())
        $rt_throw(jn_ReadOnlyBufferException__init_());
    if (jn_Buffer_remaining($this) < $length)
        $rt_throw(jn_BufferOverflowException__init_());
    if ($offset >= 0) {
        var$4 = $src.data;
        var$5 = var$4.length;
        if ($offset < var$5) {
            var$6 = $offset + $length | 0;
            if (var$6 > var$5) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$8, $rt_s(30)), var$6), $rt_s(31)), var$5);
                jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            if ($length < 0) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$8, $rt_s(32)), $length), $rt_s(33));
                jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            $pos = $this.$position + $this.$start0 | 0;
            $i = 0;
            while ($i < $length) {
                var$11 = $this.$array.data;
                var$6 = $pos + 1 | 0;
                var$5 = $offset + 1 | 0;
                var$11[$pos] = var$4[$offset];
                $i = $i + 1 | 0;
                $pos = var$6;
                $offset = var$5;
            }
            $this.$position = $this.$position + $length | 0;
            return $this;
        }
    }
    var$4 = $src.data;
    var$7 = new jl_IndexOutOfBoundsException;
    var$5 = var$4.length;
    var$8 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$8, $rt_s(34)), $offset), $rt_s(19)), var$5), 41);
    jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$8));
    $rt_throw(var$7);
}
function jn_ByteBuffer_put($this, $src) {
    return $this.$put1($src, 0, $src.data.length);
}
function jn_ByteBuffer_clear($this) {
    jn_Buffer_clear($this);
    return $this;
}
function jn_ByteBufferImpl() {
    var a = this; jn_ByteBuffer.call(a);
    a.$direct = 0;
    a.$readOnly = 0;
}
function jn_ByteBufferImpl__init_(var_0, var_1, var_2, var_3, var_4, var_5, var_6) {
    var var_7 = new jn_ByteBufferImpl();
    jn_ByteBufferImpl__init_0(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
}
function jn_ByteBufferImpl__init_0($this, $start, $capacity, $array, $position, $limit, $direct, $readOnly) {
    jn_ByteBuffer__init_($this, $start, $capacity, $array, $position, $limit);
    $this.$direct = $direct;
    $this.$readOnly = $readOnly;
}
function jn_ByteBufferImpl_isReadOnly($this) {
    return $this.$readOnly;
}
function ju_HashMap$AbstractMapIterator() {
    var a = this; jl_Object.call(a);
    a.$position2 = 0;
    a.$expectedModCount = 0;
    a.$futureEntry = null;
    a.$currentEntry = null;
    a.$prevEntry = null;
    a.$associatedMap = null;
}
function ju_HashMap$AbstractMapIterator__init_(var_0) {
    var var_1 = new ju_HashMap$AbstractMapIterator();
    ju_HashMap$AbstractMapIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$AbstractMapIterator__init_0($this, $hm) {
    jl_Object__init_0($this);
    $this.$associatedMap = $hm;
    $this.$expectedModCount = $hm.$modCount1;
    $this.$futureEntry = null;
}
function ju_HashMap$AbstractMapIterator_hasNext($this) {
    if ($this.$futureEntry !== null)
        return 1;
    while ($this.$position2 < $this.$associatedMap.$elementData.data.length) {
        if ($this.$associatedMap.$elementData.data[$this.$position2] !== null)
            return 1;
        $this.$position2 = $this.$position2 + 1 | 0;
    }
    return 0;
}
function ju_HashMap$AbstractMapIterator_checkConcurrentMod($this) {
    if ($this.$expectedModCount == $this.$associatedMap.$modCount1)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function ju_HashMap$AbstractMapIterator_makeNext($this) {
    var var$1, var$2;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    if ($this.$futureEntry === null) {
        var$1 = $this.$associatedMap.$elementData.data;
        var$2 = $this.$position2;
        $this.$position2 = var$2 + 1 | 0;
        $this.$currentEntry = var$1[var$2];
        $this.$futureEntry = $this.$currentEntry.$next2;
        $this.$prevEntry = null;
    } else {
        if ($this.$currentEntry !== null)
            $this.$prevEntry = $this.$currentEntry;
        $this.$currentEntry = $this.$futureEntry;
        $this.$futureEntry = $this.$futureEntry.$next2;
    }
}
var ju_HashMap$KeyIterator = $rt_classWithoutFields(ju_HashMap$AbstractMapIterator);
function ju_HashMap$KeyIterator__init_(var_0) {
    var var_1 = new ju_HashMap$KeyIterator();
    ju_HashMap$KeyIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$KeyIterator__init_0($this, $map) {
    ju_HashMap$AbstractMapIterator__init_0($this, $map);
}
function ju_HashMap$KeyIterator_next($this) {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry.$key;
}
function jl_Thread$SleepHandler() {
    var a = this; jl_Object.call(a);
    a.$thread = null;
    a.$callback0 = null;
    a.$isInterrupted = 0;
    a.$scheduleId = 0;
}
function jl_Thread$SleepHandler__init_(var_0, var_1) {
    var var_2 = new jl_Thread$SleepHandler();
    jl_Thread$SleepHandler__init_0(var_2, var_0, var_1);
    return var_2;
}
function jl_Thread$SleepHandler__init_0($this, $thread_0, $callback) {
    jl_Object__init_0($this);
    $this.$thread = $thread_0;
    $this.$callback0 = $callback;
}
function jl_Thread$SleepHandler_interrupted($this) {
    $this.$thread.$interruptedFlag = 0;
    $this.$isInterrupted = 1;
    otp_Platform_killSchedule($this.$scheduleId);
    otp_Platform_postpone(jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_($this));
}
function jl_Thread$SleepHandler_run($this) {
    if (!$this.$isInterrupted) {
        $this.$thread.$interruptHandler = null;
        jl_Thread_setCurrentThread($this.$thread);
        $this.$callback0.$complete(null);
    }
}
function jl_Thread$SleepHandler_lambda$interrupted$1($this) {
    $this.$callback0.$error(jl_InterruptedException__init_());
}
function gc_ColManager() {
    var a = this; jl_Object.call(a);
    a.$freeObjects = null;
    a.$collisionClasses = null;
    a.$collisionChecker0 = null;
}
function gc_ColManager__init_() {
    var var_0 = new gc_ColManager();
    gc_ColManager__init_0(var_0);
    return var_0;
}
function gc_ColManager__init_0($this) {
    jl_Object__init_0($this);
    $this.$freeObjects = ju_HashMap__init_();
    $this.$collisionClasses = ju_HashSet__init_();
    $this.$collisionChecker0 = gci_IBSPColChecker__init_();
}
function gc_ColManager_makeCollisionObjects($this, $cls, $includeSubclasses) {
    var $entries, var$4, $entry, var$6, $actor, $classSet;
    a: {
        if ($cls === null) {
            $entries = $this.$freeObjects.$entrySet();
            var$4 = $entries.$iterator();
            while (var$4.$hasNext()) {
                $entry = var$4.$next1();
                var$6 = ($entry.$getValue()).$iterator();
                while (var$6.$hasNext()) {
                    $actor = var$6.$next1();
                    $this.$collisionChecker0.$addObject($actor);
                }
                $this.$collisionClasses.$add($entry.$getKey());
            }
            $this.$freeObjects.$clear0();
        } else if (!$this.$collisionClasses.$contains0($cls)) {
            $classSet = $this.$freeObjects.$remove2($cls);
            if ($classSet !== null) {
                $this.$collisionClasses.$add($cls);
                var$4 = $classSet.$iterator();
                while (true) {
                    if (!var$4.$hasNext())
                        break a;
                    $actor = var$4.$next1();
                    $this.$collisionChecker0.$addObject($actor);
                }
            }
        }
    }
    b: {
        if ($includeSubclasses) {
            $entries = new ju_HashSet;
            var$4 = $this.$freeObjects;
            ju_HashSet__init_0($entries, var$4.$entrySet());
            var$4 = $entries.$iterator();
            while (true) {
                if (!var$4.$hasNext())
                    break b;
                $entry = var$4.$next1();
                if ($cls.$isAssignableFrom($entry.$getKey()))
                    gc_ColManager_makeCollisionObjects($this, $entry.$getKey(), 0);
            }
        }
    }
}
function gc_ColManager_prepareForCollision($this, $actor, $cls) {
    gc_ColManager_makeCollisionObjects($this, jl_Object_getClass($actor), 0);
    gc_ColManager_makeCollisionObjects($this, $cls, 1);
}
function gc_ColManager_addObject($this, $actor) {
    var $cls, $classSet;
    $cls = jl_Object_getClass($actor);
    if ($this.$collisionClasses.$contains0($cls))
        $this.$collisionChecker0.$addObject($actor);
    else {
        $classSet = $this.$freeObjects.$get0($cls);
        if ($classSet === null) {
            $classSet = ju_LinkedList__init_();
            $this.$freeObjects.$put($cls, $classSet);
        }
        $classSet.$add($actor);
    }
}
function gc_ColManager_getOneIntersectingObject($this, $object, $cls) {
    gc_ColManager_prepareForCollision($this, $object, $cls);
    return $this.$collisionChecker0.$getOneIntersectingObject($object, $cls);
}
function gc_ColManager_initialize($this, $width, $height, $cellSize, $wrap) {
    $this.$collisionChecker0.$initialize0($width, $height, $cellSize, $wrap);
}
function gc_ColManager_removeObject($this, $object) {
    var $classSet;
    $classSet = $this.$freeObjects.$get0(jl_Object_getClass($object));
    if ($classSet !== null)
        $classSet.$remove3($object);
    else
        $this.$collisionChecker0.$removeObject($object);
}
function gc_ColManager_startSequence($this) {
    $this.$collisionChecker0.$startSequence();
}
function gc_ColManager_updateObjectLocation($this, $object, $oldX, $oldY) {
    if (!$this.$freeObjects.$containsKey(jl_Object_getClass($object)))
        $this.$collisionChecker0.$updateObjectLocation($object, $oldX, $oldY);
}
function gc_ColManager_updateObjectSize($this, $object) {
    if (!$this.$freeObjects.$containsKey(jl_Object_getClass($object)))
        $this.$collisionChecker0.$updateObjectSize($object);
}
var ju_Set = $rt_classWithoutFields(0);
var ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection);
function ju_AbstractSet__init_($this) {
    ju_AbstractCollection__init_($this);
}
function ju_AbstractSet_equals($this, $obj) {
    var $other, $iter;
    if ($this === $obj)
        return 1;
    if (!$rt_isInstance($obj, ju_Set))
        return 0;
    $other = $obj;
    if ($this.$size0() != $other.$size0())
        return 0;
    $iter = $other.$iterator();
    while ($iter.$hasNext()) {
        if ($this.$contains0($iter.$next1()))
            continue;
        else
            return 0;
    }
    return 1;
}
function ju_AbstractSet_hashCode($this) {
    var $result, $iter, $e;
    $result = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $e = $iter.$next1();
        if ($e !== null)
            $result = $result + $e.$hashCode0() | 0;
    }
    return $result;
}
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
function ju_HashSet__init_() {
    var var_0 = new ju_HashSet();
    ju_HashSet__init_1(var_0);
    return var_0;
}
function ju_HashSet__init_2(var_0) {
    var var_1 = new ju_HashSet();
    ju_HashSet__init_0(var_1, var_0);
    return var_1;
}
function ju_HashSet__init_3(var_0) {
    var var_1 = new ju_HashSet();
    ju_HashSet__init_4(var_1, var_0);
    return var_1;
}
function ju_HashSet__init_1($this) {
    ju_HashSet__init_4($this, ju_HashMap__init_());
}
function ju_HashSet__init_0($this, $collection) {
    var $iter;
    ju_HashSet__init_4($this, ju_HashMap__init_0($collection.$size0() < 6 ? 11 : $collection.$size0() * 2 | 0));
    $iter = $collection.$iterator();
    while ($iter.$hasNext()) {
        $this.$add($iter.$next1());
    }
}
function ju_HashSet__init_4($this, $backingMap) {
    ju_AbstractSet__init_($this);
    $this.$backingMap = $backingMap;
}
function ju_HashSet_add($this, $object) {
    return $this.$backingMap.$put($object, $this) !== null ? 0 : 1;
}
function ju_HashSet_contains($this, $object) {
    return $this.$backingMap.$containsKey($object);
}
function ju_HashSet_iterator($this) {
    return ($this.$backingMap.$keySet()).$iterator();
}
function ju_HashSet_size($this) {
    return $this.$backingMap.$size0();
}
function g_ActorSet$ActorSetIterator() {
    var a = this; jl_Object.call(a);
    a.$currentNode = null;
    a.$this$02 = null;
}
function g_ActorSet$ActorSetIterator__init_(var_0) {
    var var_1 = new g_ActorSet$ActorSetIterator();
    g_ActorSet$ActorSetIterator__init_0(var_1, var_0);
    return var_1;
}
function g_ActorSet$ActorSetIterator__init_0($this, var$1) {
    $this.$this$02 = var$1;
    jl_Object__init_0($this);
    $this.$currentNode = g_ActorSet_access$000(var$1);
}
function g_ActorSet$ActorSetIterator_hasNext($this) {
    return $this.$currentNode.$next3 === g_ActorSet_access$000($this.$this$02) ? 0 : 1;
}
function g_ActorSet$ActorSetIterator_next($this) {
    $this.$currentNode = $this.$currentNode.$next3;
    return $this.$currentNode.$actor0;
}
function g_ActorSet$ActorSetIterator_next0($this) {
    return $this.$next4();
}
var otp_Platform = $rt_classWithoutFields();
var otp_Platform_newInstancePrepared = 0;
function otp_Platform__init_() {
    var var_0 = new otp_Platform();
    otp_Platform__init_0(var_0);
    return var_0;
}
function otp_Platform__init_0($this) {
    jl_Object__init_0($this);
}
function otp_Platform_clone(var$1) {
    var copy = new var$1.constructor();
    for (var field in var$1) {
        if (!var$1.hasOwnProperty(field)) {
            continue;
        }
        copy[field] = var$1[field];
    }
    return copy;
}
function otp_Platform_isInstance($obj, $cls) {
    return $obj !== null && !(typeof $obj.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable($obj.constructor, $cls) ? 1 : 0;
}
function otp_Platform_isAssignable($from, $to) {
    var $supertypes, $i;
    if ($from === $to)
        return 1;
    $supertypes = $from.$meta.supertypes;
    $i = 0;
    while ($i < $supertypes.length) {
        if (otp_Platform_isAssignable($supertypes[$i], $to))
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
}
function otp_Platform_newInstance($cls) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$cls = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!otp_Platform_newInstancePrepared) {
            otp_Platform_prepareNewInstance();
            otp_Platform_newInstancePrepared = 1;
        }
        $ptr = 1;
    case 1:
        $tmp = otp_Platform_newInstanceImpl($cls);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        return var$2;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($cls, var$2, $ptr);
}
function otp_Platform_prepareNewInstance() {
    var c = '$$constructor$$';
    jl_String[c] = jl_String__init_1;
    jl_Object[c] = jl_Object__init_0;
    jl_NoClassDefFoundError[c] = jl_NoClassDefFoundError__init_;
    jl_NoSuchFieldError[c] = jl_NoSuchFieldError__init_0;
    jl_NoSuchMethodError[c] = jl_NoSuchMethodError__init_0;
    jl_RuntimeException[c] = jl_RuntimeException__init_1;
    jl_StringBuilder[c] = jl_StringBuilder__init_0;
    jl_IncompatibleClassChangeError[c] = jl_IncompatibleClassChangeError__init_0;
    jl_Exception[c] = jl_Exception__init_0;
    gj_Client[c] = gj_Client__init_;
    MyWorld[c] = MyWorld__init_;
    otji_JS[c] = otji_JS__init_0;
    otp_Platform[c] = otp_Platform__init_0;
    jl_LinkageError[c] = jl_LinkageError__init_0;
    jl_Error[c] = jl_Error__init_0;
    jl_Throwable[c] = jl_Throwable__init_0;
    jl_AbstractStringBuilder[c] = jl_AbstractStringBuilder__init_0;
    ju_HashMap[c] = ju_HashMap__init_1;
    gj_GreenfootUtilJsDelegate[c] = gj_GreenfootUtilJsDelegate__init_0;
    ju_Properties[c] = ju_Properties__init_;
    ji_IOException[c] = ji_IOException__init_1;
    jl_String$_clinit_$lambda$_84_0[c] = jl_String$_clinit_$lambda$_84_0__init_0;
    otci_IntegerUtil[c] = otci_IntegerUtil__init_0;
    gu_GreenfootUtil[c] = gu_GreenfootUtil__init_0;
    g_ActorVisitor[c] = g_ActorVisitor__init_;
    ju_Hashtable[c] = ju_Hashtable__init_;
    jl_System[c] = jl_System__init_;
    jl_Thread[c] = jl_Thread__init_0;
    jl_NumberFormatException[c] = jl_NumberFormatException__init_2;
    jl_IllegalArgumentException[c] = jl_IllegalArgumentException__init_2;
    gc_ImageCache[c] = gc_ImageCache__init_0;
    gj_KeyboardManager[c] = gj_KeyboardManager__init_;
    g_GreenfootImage[c] = g_GreenfootImage__init_1;
    otcic_StdoutOutputStream[c] = otcic_StdoutOutputStream__init_0;
    jl_IllegalStateException[c] = jl_IllegalStateException__init_1;
    jl_IllegalMonitorStateException[c] = jl_IllegalMonitorStateException__init_0;
    jl_InterruptedException[c] = jl_InterruptedException__init_0;
    ju_LinkedList[c] = ju_LinkedList__init_0;
    ju_ArrayList[c] = ju_ArrayList__init_1;
    jl_ClassNotFoundException[c] = jl_ClassNotFoundException__init_;
    jl_ReflectiveOperationException[c] = jl_ReflectiveOperationException__init_0;
    jl_InstantiationException[c] = jl_InstantiationException__init_0;
    ju_Objects[c] = ju_Objects__init_0;
    ggim_MouseEventData[c] = ggim_MouseEventData__init_;
    ju_Hashtable$1[c] = ju_Hashtable$1__init_0;
    ju_Hashtable$2[c] = ju_Hashtable$2__init_0;
    jnci_UTF8Charset[c] = jnci_UTF8Charset__init_;
    jl_Object$Monitor[c] = jl_Object$Monitor__init_0;
    jl_NullPointerException[c] = jl_NullPointerException__init_1;
    otcic_StderrOutputStream[c] = otcic_StderrOutputStream__init_;
    jl_DefaultUncaughtExceptionHandler[c] = jl_DefaultUncaughtExceptionHandler__init_0;
    jl_Math[c] = jl_Math__init_;
    otpp_ResourceAccessor[c] = otpp_ResourceAccessor__init_0;
    otciu_UnicodeHelper[c] = otciu_UnicodeHelper__init_0;
    jl_CloneNotSupportedException[c] = jl_CloneNotSupportedException__init_0;
    otci_Base46[c] = otci_Base46__init_0;
    jl_StringIndexOutOfBoundsException[c] = jl_StringIndexOutOfBoundsException__init_0;
    ju_Arrays[c] = ju_Arrays__init_;
    jl_IndexOutOfBoundsException[c] = jl_IndexOutOfBoundsException__init_0;
    jl_ArrayStoreException[c] = jl_ArrayStoreException__init_0;
    g_WorldVisitor[c] = g_WorldVisitor__init_;
    jlr_Array[c] = jlr_Array__init_0;
    g_ImageVisitor[c] = g_ImageVisitor__init_0;
    gu_GraphicsUtilities[c] = gu_GraphicsUtilities__init_0;
    jl_NegativeArraySizeException[c] = jl_NegativeArraySizeException__init_0;
    gc_ColManager[c] = gc_ColManager__init_0;
    g_TreeActorSet[c] = g_TreeActorSet__init_0;
    enemymenu[c] = enemymenu__init_;
    playermenu[c] = playermenu__init_;
    wintxt[c] = wintxt__init_0;
    ju_HashSet[c] = ju_HashSet__init_1;
    gci_IBSPColChecker[c] = gci_IBSPColChecker__init_0;
    g_ActorSet[c] = g_ActorSet__init_;
    gc_GOCollisionQuery[c] = gc_GOCollisionQuery__init_0;
    gc_NeighbourCollisionQuery[c] = gc_NeighbourCollisionQuery__init_0;
    gc_PointCollisionQuery[c] = gc_PointCollisionQuery__init_0;
    gc_InRangeQuery[c] = gc_InRangeQuery__init_0;
    otcic_Console[c] = otcic_Console__init_;
    ju_NoSuchElementException[c] = ju_NoSuchElementException__init_0;
    jl_UnsupportedOperationException[c] = jl_UnsupportedOperationException__init_0;
    ju_ConcurrentModificationException[c] = ju_ConcurrentModificationException__init_0;
    gc_ActInterruptedException[c] = gc_ActInterruptedException__init_0;
    otjb_Performance[c] = otjb_Performance__init_0;
    gci_BSPNodeCache[c] = gci_BSPNodeCache__init_;
    ju_LinkedList$Entry[c] = ju_LinkedList$Entry__init_;
    ggim_PriorityManager[c] = ggim_PriorityManager__init_;
    game[c] = game__init_;
    g_MouseInfo[c] = g_MouseInfo__init_0;
    g_Greenfoot[c] = g_Greenfoot__init_;
    g_MouseInfoVisitor[c] = g_MouseInfoVisitor__init_0;
    ju_Random[c] = ju_Random__init_0;
    smily[c] = smily__init_;
    colectble[c] = colectble__init_;
    enemy[c] = enemy__init_0;
    jn_ReadOnlyBufferException[c] = jn_ReadOnlyBufferException__init_0;
    jn_BufferOverflowException[c] = jn_BufferOverflowException__init_0;
    jn_BufferUnderflowException[c] = jn_BufferUnderflowException__init_;
    jl_AbstractStringBuilder$Constants[c] = jl_AbstractStringBuilder$Constants__init_0;
    otcit_DoubleAnalyzer[c] = otcit_DoubleAnalyzer__init_;
    otcit_DoubleAnalyzer$Result[c] = otcit_DoubleAnalyzer$Result__init_0;
    otcit_FloatAnalyzer$Result[c] = otcit_FloatAnalyzer$Result__init_0;
    loose[c] = loose__init_0;
    win[c] = win__init_;
}
function otp_Platform_newInstanceImpl(var$1) {
    if ($rt_resuming()) {
        var $r = $rt_nativeThread().pop();
        var$1.$$constructor$$($r);
        if ($rt_suspending()) {
            return $rt_nativeThread().push($r);
        }
        return $r;
    }
    if (!var$1.hasOwnProperty('$$constructor$$')) {
        return null;
    }
    var $r = new var$1();
    var$1.$$constructor$$($r);
    if ($rt_suspending()) {
        return $rt_nativeThread().push($r);
    }
    return $r;
}
function otp_Platform_lookupClass(var$1) {
    switch ($rt_ustr(var$1)) {
        case "java.lang.IndexOutOfBoundsException": jl_IndexOutOfBoundsException.$clinit(); return jl_IndexOutOfBoundsException;
        case "greenfoot.j2js.GreenfootUtilJsDelegate": gj_GreenfootUtilJsDelegate.$clinit(); return gj_GreenfootUtilJsDelegate;
        case "java.io.BufferedInputStream": ji_BufferedInputStream.$clinit(); return ji_BufferedInputStream;
        case "java.util.Enumeration": ju_Enumeration.$clinit(); return ju_Enumeration;
        case "greenfoot.j2js.MouseManager$handleTouchEvent$lambda$_11_0": gj_MouseManager$handleTouchEvent$lambda$_11_0.$clinit(); return gj_MouseManager$handleTouchEvent$lambda$_11_0;
        case "java.nio.charset.impl.BufferedEncoder$Controller": jnci_BufferedEncoder$Controller.$clinit(); return jnci_BufferedEncoder$Controller;
        case "java.lang.Integer": jl_Integer.$clinit(); return jl_Integer;
        case "java.lang.CloneNotSupportedException": jl_CloneNotSupportedException.$clinit(); return jl_CloneNotSupportedException;
        case "org.teavm.jso.typedarrays.Uint8Array": otjt_Uint8Array.$clinit(); return otjt_Uint8Array;
        case "java.lang.AbstractStringBuilder$Constants": jl_AbstractStringBuilder$Constants.$clinit(); return jl_AbstractStringBuilder$Constants;
        case "java.lang.Object$NotifyListenerImpl": jl_Object$NotifyListenerImpl.$clinit(); return jl_Object$NotifyListenerImpl;
        case "org.teavm.jso.dom.html.HTMLDocument": otjdh_HTMLDocument.$clinit(); return otjdh_HTMLDocument;
        case "java.lang.Long": jl_Long.$clinit(); return jl_Long;
        case "java.util.Map": ju_Map.$clinit(); return ju_Map;
        case "java.lang.Thread": jl_Thread.$clinit(); return jl_Thread;
        case "wintxt": wintxt.$clinit(); return wintxt;
        case "greenfoot.j2js.Client$getResourceBytes$lambda$_12_0": gj_Client$getResourceBytes$lambda$_12_0.$clinit(); return gj_Client$getResourceBytes$lambda$_12_0;
        case "greenfoot.j2js.Client$getResourceBytes$lambda$_12_1": gj_Client$getResourceBytes$lambda$_12_1.$clinit(); return gj_Client$getResourceBytes$lambda$_12_1;
        case "org.teavm.platform.PlatformQueue": otp_PlatformQueue.$clinit(); return otp_PlatformQueue;
        case "org.teavm.jso.dom.events.GamepadEventTarget": otjde_GamepadEventTarget.$clinit(); return otjde_GamepadEventTarget;
        case "java.lang.CharSequence": jl_CharSequence.$clinit(); return jl_CharSequence;
        case "java.lang.LinkageError": jl_LinkageError.$clinit(); return jl_LinkageError;
        case "org.teavm.jso.dom.events.LoadEventTarget": otjde_LoadEventTarget.$clinit(); return otjde_LoadEventTarget;
        case "java.lang.StringIndexOutOfBoundsException": jl_StringIndexOutOfBoundsException.$clinit(); return jl_StringIndexOutOfBoundsException;
        case "greenfoot.j2js.TouchManager": gj_TouchManager.$clinit(); return gj_TouchManager;
        case "java.io.Serializable": ji_Serializable.$clinit(); return ji_Serializable;
        case "java.nio.ByteOrder": jn_ByteOrder.$clinit(); return jn_ByteOrder;
        case "org.teavm.classlib.impl.Base46": otci_Base46.$clinit(); return otci_Base46;
        case "org.teavm.classlib.impl.console.StdoutOutputStream": otcic_StdoutOutputStream.$clinit(); return otcic_StdoutOutputStream;
        case "org.teavm.jso.browser.TimerHandler": otjb_TimerHandler.$clinit(); return otjb_TimerHandler;
        case "java.lang.StringBuilder": jl_StringBuilder.$clinit(); return jl_StringBuilder;
        case "java.util.ConcurrentModificationException": ju_ConcurrentModificationException.$clinit(); return ju_ConcurrentModificationException;
        case "java.util.Hashtable$1": ju_Hashtable$1.$clinit(); return ju_Hashtable$1;
        case "java.util.Hashtable$2": ju_Hashtable$2.$clinit(); return ju_Hashtable$2;
        case "java.util.Hashtable$Entry": ju_Hashtable$Entry.$clinit(); return ju_Hashtable$Entry;
        case "greenfoot.MouseInfoVisitor": g_MouseInfoVisitor.$clinit(); return g_MouseInfoVisitor;
        case "enemy": enemy.$clinit(); return enemy;
        case "java.lang.ReflectiveOperationException": jl_ReflectiveOperationException.$clinit(); return jl_ReflectiveOperationException;
        case "greenfoot.platforms.GreenfootUtilDelegate": gp_GreenfootUtilDelegate.$clinit(); return gp_GreenfootUtilDelegate;
        case "greenfoot.collision.GOCollisionQuery": gc_GOCollisionQuery.$clinit(); return gc_GOCollisionQuery;
        case "java.nio.charset.CoderMalfunctionError": jnc_CoderMalfunctionError.$clinit(); return jnc_CoderMalfunctionError;
        case "greenfoot.j2js.Client$<init>$lambda$_1_3": gj_Client$_init_$lambda$_1_3.$clinit(); return gj_Client$_init_$lambda$_1_3;
        case "greenfoot.j2js.Client$<init>$lambda$_1_2": gj_Client$_init_$lambda$_1_2.$clinit(); return gj_Client$_init_$lambda$_1_2;
        case "greenfoot.j2js.Client$<init>$lambda$_1_1": gj_Client$_init_$lambda$_1_1.$clinit(); return gj_Client$_init_$lambda$_1_1;
        case "greenfoot.collision.ibsp.ActorNode": gci_ActorNode.$clinit(); return gci_ActorNode;
        case "java.nio.Buffer": jn_Buffer.$clinit(); return jn_Buffer;
        case "greenfoot.Color": g_Color.$clinit(); return g_Color;
        case "greenfoot.j2js.Client$getResourceURL$lambda$_11_0": gj_Client$getResourceURL$lambda$_11_0.$clinit(); return gj_Client$getResourceURL$lambda$_11_0;
        case "greenfoot.j2js.Client$<init>$lambda$_1_0": gj_Client$_init_$lambda$_1_0.$clinit(); return gj_Client$_init_$lambda$_1_0;
        case "greenfoot.j2js.Client$getResourceURL$lambda$_11_1": gj_Client$getResourceURL$lambda$_11_1.$clinit(); return gj_Client$getResourceURL$lambda$_11_1;
        case "java.io.Flushable": ji_Flushable.$clinit(); return ji_Flushable;
        case "greenfoot.collision.ibsp.Rect": gci_Rect.$clinit(); return gci_Rect;
        case "java.lang.IncompatibleClassChangeError": jl_IncompatibleClassChangeError.$clinit(); return jl_IncompatibleClassChangeError;
        case "java.lang.NoSuchMethodError": jl_NoSuchMethodError.$clinit(); return jl_NoSuchMethodError;
        case "java.io.IOException": ji_IOException.$clinit(); return ji_IOException;
        case "greenfoot.collision.PointCollisionQuery": gc_PointCollisionQuery.$clinit(); return gc_PointCollisionQuery;
        case "org.teavm.jso.typedarrays.ArrayBufferView": otjt_ArrayBufferView.$clinit(); return otjt_ArrayBufferView;
        case "java.lang.String$<clinit>$lambda$_84_0": jl_String$_clinit_$lambda$_84_0.$clinit(); return jl_String$_clinit_$lambda$_84_0;
        case "greenfoot.collision.ibsp.IBSPColChecker": gci_IBSPColChecker.$clinit(); return gci_IBSPColChecker;
        case "java.util.AbstractList$1": ju_AbstractList$1.$clinit(); return ju_AbstractList$1;
        case "greenfoot.core.ActInterruptedException": gc_ActInterruptedException.$clinit(); return gc_ActInterruptedException;
        case "greenfoot.core.ImageCache": gc_ImageCache.$clinit(); return gc_ImageCache;
        case "java.nio.ReadOnlyBufferException": jn_ReadOnlyBufferException.$clinit(); return jn_ReadOnlyBufferException;
        case "greenfoot.core.Simulation": gc_Simulation.$clinit(); return gc_Simulation;
        case "java.lang.reflect.Array": jlr_Array.$clinit(); return jlr_Array;
        case "java.lang.Object$NotifyListenerImpl$interrupted$lambda$_4_0": jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0.$clinit(); return jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0;
        case "greenfoot.util.GreenfootUtil": gu_GreenfootUtil.$clinit(); return gu_GreenfootUtil;
        case "java.util.ListIterator": ju_ListIterator.$clinit(); return ju_ListIterator;
        case "org.teavm.classlib.impl.text.DoubleAnalyzer$Result": otcit_DoubleAnalyzer$Result.$clinit(); return otcit_DoubleAnalyzer$Result;
        case "java.util.Random": ju_Random.$clinit(); return ju_Random;
        case "java.lang.Runnable": jl_Runnable.$clinit(); return jl_Runnable;
        case "org.teavm.platform.plugin.ResourceAccessor": otpp_ResourceAccessor.$clinit(); return otpp_ResourceAccessor;
        case "java.lang.NoSuchFieldError": jl_NoSuchFieldError.$clinit(); return jl_NoSuchFieldError;
        case "java.util.AbstractCollection": ju_AbstractCollection.$clinit(); return ju_AbstractCollection;
        case "greenfoot.util.GraphicsUtilities": gu_GraphicsUtilities.$clinit(); return gu_GraphicsUtilities;
        case "java.io.ByteArrayInputStream": ji_ByteArrayInputStream.$clinit(); return ji_ByteArrayInputStream;
        case "org.teavm.classlib.impl.IntegerUtil": otci_IntegerUtil.$clinit(); return otci_IntegerUtil;
        case "java.lang.InstantiationException": jl_InstantiationException.$clinit(); return jl_InstantiationException;
        case "java.lang.DefaultUncaughtExceptionHandler": jl_DefaultUncaughtExceptionHandler.$clinit(); return jl_DefaultUncaughtExceptionHandler;
        case "java.lang.Readable": jl_Readable.$clinit(); return jl_Readable;
        case "greenfoot.ImageVisitor": g_ImageVisitor.$clinit(); return g_ImageVisitor;
        case "org.teavm.jso.impl.JS": otji_JS.$clinit(); return otji_JS;
        case "greenfoot.Actor": g_Actor.$clinit(); return g_Actor;
        case "java.util.Collection": ju_Collection.$clinit(); return ju_Collection;
        case "org.teavm.platform.PlatformRunnable": otp_PlatformRunnable.$clinit(); return otp_PlatformRunnable;
        case "java.net.URLStreamHandlerFactory": jn_URLStreamHandlerFactory.$clinit(); return jn_URLStreamHandlerFactory;
        case "org.teavm.classlib.impl.unicode.UnicodeHelper": otciu_UnicodeHelper.$clinit(); return otciu_UnicodeHelper;
        case "java.lang.Object$monitorEnterWait$lambda$_6_0": jl_Object$monitorEnterWait$lambda$_6_0.$clinit(); return jl_Object$monitorEnterWait$lambda$_6_0;
        case "java.util.Objects": ju_Objects.$clinit(); return ju_Objects;
        case "greenfoot.GreenfootImage$2": g_GreenfootImage$2.$clinit(); return g_GreenfootImage$2;
        case "java.util.HashMap$HashEntry": ju_HashMap$HashEntry.$clinit(); return ju_HashMap$HashEntry;
        case "greenfoot.GreenfootImage$1": g_GreenfootImage$1.$clinit(); return g_GreenfootImage$1;
        case "java.nio.charset.CharsetEncoder": jnc_CharsetEncoder.$clinit(); return jnc_CharsetEncoder;
        case "org.teavm.jso.browser.Performance": otjb_Performance.$clinit(); return otjb_Performance;
        case "loose": loose.$clinit(); return loose;
        case "greenfoot.j2js.Client$lambda$new$1$lambda$_22_0": gj_Client$lambda$new$1$lambda$_22_0.$clinit(); return gj_Client$lambda$new$1$lambda$_22_0;
        case "java.util.Queue": ju_Queue.$clinit(); return ju_Queue;
        case "java.util.MapEntry": ju_MapEntry.$clinit(); return ju_MapEntry;
        case "java.lang.ArrayStoreException": jl_ArrayStoreException.$clinit(); return jl_ArrayStoreException;
        case "java.nio.ByteBufferImpl": jn_ByteBufferImpl.$clinit(); return jn_ByteBufferImpl;
        case "java.util.HashMap$KeyIterator": ju_HashMap$KeyIterator.$clinit(); return ju_HashMap$KeyIterator;
        case "java.lang.Thread$SleepHandler": jl_Thread$SleepHandler.$clinit(); return jl_Thread$SleepHandler;
        case "greenfoot.j2js.ContentReceiver": gj_ContentReceiver.$clinit(); return gj_ContentReceiver;
        case "greenfoot.collision.ColManager": gc_ColManager.$clinit(); return gc_ColManager;
        case "greenfoot.j2js.ErrorCallback": gj_ErrorCallback.$clinit(); return gj_ErrorCallback;
        case "java.util.HashSet": ju_HashSet.$clinit(); return ju_HashSet;
        case "java.io.FilterInputStream": ji_FilterInputStream.$clinit(); return ji_FilterInputStream;
        case "greenfoot.ActorSet$ActorSetIterator": g_ActorSet$ActorSetIterator.$clinit(); return g_ActorSet$ActorSetIterator;
        case "org.teavm.platform.Platform": otp_Platform.$clinit(); return otp_Platform;
        case "java.nio.charset.Charset": jnc_Charset.$clinit(); return jnc_Charset;
        case "java.lang.Thread$UncaughtExceptionHandler": jl_Thread$UncaughtExceptionHandler.$clinit(); return jl_Thread$UncaughtExceptionHandler;
        case "greenfoot.platforms.ActorDelegate": gp_ActorDelegate.$clinit(); return gp_ActorDelegate;
        case "java.nio.charset.CodingErrorAction": jnc_CodingErrorAction.$clinit(); return jnc_CodingErrorAction;
        case "java.lang.AbstractStringBuilder": jl_AbstractStringBuilder.$clinit(); return jl_AbstractStringBuilder;
        case "java.nio.charset.IllegalCharsetNameException": jnc_IllegalCharsetNameException.$clinit(); return jnc_IllegalCharsetNameException;
        case "java.util.LinkedList": ju_LinkedList.$clinit(); return ju_LinkedList;
        case "java.util.NoSuchElementException": ju_NoSuchElementException.$clinit(); return ju_NoSuchElementException;
        case "java.io.PrintStream": ji_PrintStream.$clinit(); return ji_PrintStream;
        case "java.lang.Appendable": jl_Appendable.$clinit(); return jl_Appendable;
        case "org.teavm.interop.AsyncCallback": oti_AsyncCallback.$clinit(); return oti_AsyncCallback;
        case "greenfoot.GreenfootImage": g_GreenfootImage.$clinit(); return g_GreenfootImage;
        case "java.util.AbstractMap": ju_AbstractMap.$clinit(); return ju_AbstractMap;
        case "java.lang.Object": jl_Object.$clinit(); return jl_Object;
        case "java.lang.Class": jl_Class.$clinit(); return jl_Class;
        case "java.util.Comparator": ju_Comparator.$clinit(); return ju_Comparator;
        case "greenfoot.core.ImageCache$CachedImageRef": gc_ImageCache$CachedImageRef.$clinit(); return gc_ImageCache$CachedImageRef;
        case "org.teavm.jso.dom.xml.Document": otjdx_Document.$clinit(); return otjdx_Document;
        case "java.util.Arrays": ju_Arrays.$clinit(); return ju_Arrays;
        case "greenfoot.collision.ibsp.BSPNodeCache": gci_BSPNodeCache.$clinit(); return gci_BSPNodeCache;
        case "greenfoot.j2js.MouseManager": gj_MouseManager.$clinit(); return gj_MouseManager;
        case "greenfoot.gui.input.mouse.WorldLocator": ggim_WorldLocator.$clinit(); return ggim_WorldLocator;
        case "greenfoot.core.WorldHandler$1": gc_WorldHandler$1.$clinit(); return gc_WorldHandler$1;
        case "java.lang.System": jl_System.$clinit(); return jl_System;
        case "greenfoot.Greenfoot": g_Greenfoot.$clinit(); return g_Greenfoot;
        case "greenfoot.collision.InRangeQuery": gc_InRangeQuery.$clinit(); return gc_InRangeQuery;
        case "greenfoot.core.WorldHandler$2": gc_WorldHandler$2.$clinit(); return gc_WorldHandler$2;
        case "java.util.LinkedList$Entry": ju_LinkedList$Entry.$clinit(); return ju_LinkedList$Entry;
        case "java.lang.Character": jl_Character.$clinit(); return jl_Character;
        case "java.lang.Object$monitorExit$lambda$_8_0": jl_Object$monitorExit$lambda$_8_0.$clinit(); return jl_Object$monitorExit$lambda$_8_0;
        case "greenfoot.GreenfootImage$2$handleEvent$lambda$_1_0": g_GreenfootImage$2$handleEvent$lambda$_1_0.$clinit(); return g_GreenfootImage$2$handleEvent$lambda$_1_0;
        case "greenfoot.gui.input.mouse.PriorityManager": ggim_PriorityManager.$clinit(); return ggim_PriorityManager;
        case "java.nio.CharBufferOverArray": jn_CharBufferOverArray.$clinit(); return jn_CharBufferOverArray;
        case "org.teavm.classlib.impl.console.Console": otcic_Console.$clinit(); return otcic_Console;
        case "java.util.Set": ju_Set.$clinit(); return ju_Set;
        case "java.lang.Thread$SleepHandler$interrupted$lambda$_1_0": jl_Thread$SleepHandler$interrupted$lambda$_1_0.$clinit(); return jl_Thread$SleepHandler$interrupted$lambda$_1_0;
        case "java.io.FilterOutputStream": ji_FilterOutputStream.$clinit(); return ji_FilterOutputStream;
        case "java.lang.Exception": jl_Exception.$clinit(); return jl_Exception;
        case "greenfoot.ActorVisitor": g_ActorVisitor.$clinit(); return g_ActorVisitor;
        case "playermenu": playermenu.$clinit(); return playermenu;
        case "org.teavm.classlib.ResourceSource": otc_ResourceSource.$clinit(); return otc_ResourceSource;
        case "java.lang.Object$NotifyListener": jl_Object$NotifyListener.$clinit(); return jl_Object$NotifyListener;
        case "java.util.Dictionary": ju_Dictionary.$clinit(); return ju_Dictionary;
        case "java.lang.reflect.AnnotatedElement": jlr_AnnotatedElement.$clinit(); return jlr_AnnotatedElement;
        case "java.lang.Throwable": jl_Throwable.$clinit(); return jl_Throwable;
        case "greenfoot.gui.input.mouse.MouseEventData": ggim_MouseEventData.$clinit(); return ggim_MouseEventData;
        case "java.util.HashMap$1": ju_HashMap$1.$clinit(); return ju_HashMap$1;
        case "org.teavm.jso.JSObject": otj_JSObject.$clinit(); return otj_JSObject;
        case "java.lang.Double": jl_Double.$clinit(); return jl_Double;
        case "greenfoot.ActorSet$ListNode": g_ActorSet$ListNode.$clinit(); return g_ActorSet$ListNode;
        case "java.lang.Error": jl_Error.$clinit(); return jl_Error;
        case "org.teavm.jso.browser.WindowEventTarget": otjb_WindowEventTarget.$clinit(); return otjb_WindowEventTarget;
        case "greenfoot.World": g_World.$clinit(); return g_World;
        case "greenfoot.event.SimulationEvent": ge_SimulationEvent.$clinit(); return ge_SimulationEvent;
        case "java.util.ArrayList": ju_ArrayList.$clinit(); return ju_ArrayList;
        case "java.util.RandomAccess": ju_RandomAccess.$clinit(); return ju_RandomAccess;
        case "org.teavm.jso.browser.Window": otjb_Window.$clinit(); return otjb_Window;
        case "java.lang.IllegalMonitorStateException": jl_IllegalMonitorStateException.$clinit(); return jl_IllegalMonitorStateException;
        case "java.util.LinkedList$SequentialListIterator": ju_LinkedList$SequentialListIterator.$clinit(); return ju_LinkedList$SequentialListIterator;
        case "greenfoot.j2js.KeyboardManager": gj_KeyboardManager.$clinit(); return gj_KeyboardManager;
        case "java.lang.String": jl_String.$clinit(); return jl_String;
        case "org.teavm.classlib.impl.console.StderrOutputStream": otcic_StderrOutputStream.$clinit(); return otcic_StderrOutputStream;
        case "java.lang.Number": jl_Number.$clinit(); return jl_Number;
        case "greenfoot.j2js.Client$2": gj_Client$2.$clinit(); return gj_Client$2;
        case "greenfoot.j2js.Client$1": gj_Client$1.$clinit(); return gj_Client$1;
        case "greenfoot.j2js.Client$4": gj_Client$4.$clinit(); return gj_Client$4;
        case "greenfoot.j2js.Client$3": gj_Client$3.$clinit(); return gj_Client$3;
        case "org.teavm.jso.dom.events.FocusEventTarget": otjde_FocusEventTarget.$clinit(); return otjde_FocusEventTarget;
        case "java.lang.NegativeArraySizeException": jl_NegativeArraySizeException.$clinit(); return jl_NegativeArraySizeException;
        case "greenfoot.TreeActorSet$TasIterator": g_TreeActorSet$TasIterator.$clinit(); return g_TreeActorSet$TasIterator;
        case "java.nio.charset.impl.UTF8Encoder": jnci_UTF8Encoder.$clinit(); return jnci_UTF8Encoder;
        case "java.lang.UnsupportedOperationException": jl_UnsupportedOperationException.$clinit(); return jl_UnsupportedOperationException;
        case "org.teavm.jso.dom.events.MouseEventTarget": otjde_MouseEventTarget.$clinit(); return otjde_MouseEventTarget;
        case "java.util.Map$Entry": ju_Map$Entry.$clinit(); return ju_Map$Entry;
        case "java.util.Properties": ju_Properties.$clinit(); return ju_Properties;
        case "java.lang.NumberFormatException": jl_NumberFormatException.$clinit(); return jl_NumberFormatException;
        case "java.lang.RuntimeException": jl_RuntimeException.$clinit(); return jl_RuntimeException;
        case "greenfoot.collision.NeighbourCollisionQuery": gc_NeighbourCollisionQuery.$clinit(); return gc_NeighbourCollisionQuery;
        case "greenfoot.core.WorldHandler": gc_WorldHandler.$clinit(); return gc_WorldHandler;
        case "java.nio.charset.impl.UTF8Charset": jnci_UTF8Charset.$clinit(); return jnci_UTF8Charset;
        case "org.teavm.jso.dom.events.KeyboardEventTarget": otjde_KeyboardEventTarget.$clinit(); return otjde_KeyboardEventTarget;
        case "java.lang.Comparable": jl_Comparable.$clinit(); return jl_Comparable;
        case "java.lang.ClassNotFoundException": jl_ClassNotFoundException.$clinit(); return jl_ClassNotFoundException;
        case "java.nio.CharBufferImpl": jn_CharBufferImpl.$clinit(); return jn_CharBufferImpl;
        case "greenfoot.j2js.MouseManager$1$handleEvent$lambda$_1_0": gj_MouseManager$1$handleEvent$lambda$_1_0.$clinit(); return gj_MouseManager$1$handleEvent$lambda$_1_0;
        case "java.lang.IllegalStateException": jl_IllegalStateException.$clinit(); return jl_IllegalStateException;
        case "greenfoot.event.WorldEvent": ge_WorldEvent.$clinit(); return ge_WorldEvent;
        case "java.net.URL": jn_URL.$clinit(); return jn_URL;
        case "java.util.HashMap$AbstractMapIterator": ju_HashMap$AbstractMapIterator.$clinit(); return ju_HashMap$AbstractMapIterator;
        case "java.util.AbstractList": ju_AbstractList.$clinit(); return ju_AbstractList;
        case "java.lang.AutoCloseable": jl_AutoCloseable.$clinit(); return jl_AutoCloseable;
        case "java.lang.NullPointerException": jl_NullPointerException.$clinit(); return jl_NullPointerException;
        case "java.nio.ByteBuffer": jn_ByteBuffer.$clinit(); return jn_ByteBuffer;
        case "org.teavm.platform.plugin.AsyncCallbackWrapper": otpp_AsyncCallbackWrapper.$clinit(); return otpp_AsyncCallbackWrapper;
        case "org.teavm.runtime.EventQueue$Event": otr_EventQueue$Event.$clinit(); return otr_EventQueue$Event;
        case "enemymenu": enemymenu.$clinit(); return enemymenu;
        case "java.lang.Object$Monitor": jl_Object$Monitor.$clinit(); return jl_Object$Monitor;
        case "java.lang.ThreadInterruptHandler": jl_ThreadInterruptHandler.$clinit(); return jl_ThreadInterruptHandler;
        case "greenfoot.collision.CollisionQuery": gc_CollisionQuery.$clinit(); return gc_CollisionQuery;
        case "java.lang.Math": jl_Math.$clinit(); return jl_Math;
        case "java.util.HashMap$HashMapEntrySet": ju_HashMap$HashMapEntrySet.$clinit(); return ju_HashMap$HashMapEntrySet;
        case "greenfoot.ActorSet": g_ActorSet.$clinit(); return g_ActorSet;
        case "smily": smily.$clinit(); return smily;
        case "greenfoot.WorldVisitor": g_WorldVisitor.$clinit(); return g_WorldVisitor;
        case "MyWorld": MyWorld.$clinit(); return MyWorld;
        case "greenfoot.j2js.MouseManager$1": gj_MouseManager$1.$clinit(); return gj_MouseManager$1;
        case "greenfoot.collision.CollisionChecker": gc_CollisionChecker.$clinit(); return gc_CollisionChecker;
        case "java.lang.Cloneable": jl_Cloneable.$clinit(); return jl_Cloneable;
        case "greenfoot.event.WorldListener": ge_WorldListener.$clinit(); return ge_WorldListener;
        case "java.nio.CharBuffer": jn_CharBuffer.$clinit(); return jn_CharBuffer;
        case "java.util.AbstractSequentialList": ju_AbstractSequentialList.$clinit(); return ju_AbstractSequentialList;
        case "java.util.List": ju_List.$clinit(); return ju_List;
        case "greenfoot.j2js.JsActorDelegate": gj_JsActorDelegate.$clinit(); return gj_JsActorDelegate;
        case "java.lang.Object$NotifyListenerImpl$onTimer$lambda$_2_0": jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0.$clinit(); return jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0;
        case "greenfoot.TreeActorSet": g_TreeActorSet.$clinit(); return g_TreeActorSet;
        case "java.lang.reflect.Type": jlr_Type.$clinit(); return jlr_Type;
        case "greenfoot.core.RepaintHandler": gc_RepaintHandler.$clinit(); return gc_RepaintHandler;
        case "colectble": colectble.$clinit(); return colectble;
        case "greenfoot.platforms.SimulationDelegate": gp_SimulationDelegate.$clinit(); return gp_SimulationDelegate;
        case "org.teavm.jso.dom.events.EventTarget": otjde_EventTarget.$clinit(); return otjde_EventTarget;
        case "game": game.$clinit(); return game;
        case "org.teavm.classlib.impl.console.ConsoleOutputStream": otcic_ConsoleOutputStream.$clinit(); return otcic_ConsoleOutputStream;
        case "org.teavm.jso.dom.events.EventListener": otjde_EventListener.$clinit(); return otjde_EventListener;
        case "java.nio.BufferOverflowException": jn_BufferOverflowException.$clinit(); return jn_BufferOverflowException;
        case "java.util.AbstractSet": ju_AbstractSet.$clinit(); return ju_AbstractSet;
        case "java.util.HashMap": ju_HashMap.$clinit(); return ju_HashMap;
        case "greenfoot.GreenfootImage$1$handleEvent$lambda$_1_0": g_GreenfootImage$1$handleEvent$lambda$_1_0.$clinit(); return g_GreenfootImage$1$handleEvent$lambda$_1_0;
        case "java.util.Deque": ju_Deque.$clinit(); return ju_Deque;
        case "java.lang.Thread$start$lambda$_4_0": jl_Thread$start$lambda$_4_0.$clinit(); return jl_Thread$start$lambda$_4_0;
        case "java.lang.Iterable": jl_Iterable.$clinit(); return jl_Iterable;
        case "org.teavm.classlib.impl.unicode.UnicodeHelper$Range": otciu_UnicodeHelper$Range.$clinit(); return otciu_UnicodeHelper$Range;
        case "java.nio.charset.CoderResult": jnc_CoderResult.$clinit(); return jnc_CoderResult;
        case "greenfoot.MouseInfo": g_MouseInfo.$clinit(); return g_MouseInfo;
        case "org.teavm.classlib.impl.text.DoubleAnalyzer": otcit_DoubleAnalyzer.$clinit(); return otcit_DoubleAnalyzer;
        case "java.lang.NoClassDefFoundError": jl_NoClassDefFoundError.$clinit(); return jl_NoClassDefFoundError;
        case "win": win.$clinit(); return win;
        case "java.util.Hashtable": ju_Hashtable.$clinit(); return ju_Hashtable;
        case "greenfoot.j2js.Client": gj_Client.$clinit(); return gj_Client;
        case "java.io.OutputStream": ji_OutputStream.$clinit(); return ji_OutputStream;
        case "greenfoot.event.SimulationListener": ge_SimulationListener.$clinit(); return ge_SimulationListener;
        case "org.teavm.classlib.impl.CharFlow": otci_CharFlow.$clinit(); return otci_CharFlow;
        case "java.util.Iterator": ju_Iterator.$clinit(); return ju_Iterator;
        case "greenfoot.core.TextLabel": gc_TextLabel.$clinit(); return gc_TextLabel;
        case "greenfoot.j2js.MouseManager$handleEvent$lambda$_10_0": gj_MouseManager$handleEvent$lambda$_10_0.$clinit(); return gj_MouseManager$handleEvent$lambda$_10_0;
        case "java.lang.IllegalArgumentException": jl_IllegalArgumentException.$clinit(); return jl_IllegalArgumentException;
        case "java.nio.BufferUnderflowException": jn_BufferUnderflowException.$clinit(); return jn_BufferUnderflowException;
        case "java.nio.charset.impl.BufferedEncoder": jnci_BufferedEncoder.$clinit(); return jnci_BufferedEncoder;
        case "org.teavm.jso.dom.xml.Node": otjdx_Node.$clinit(); return otjdx_Node;
        case "org.teavm.classlib.impl.text.FloatAnalyzer$Result": otcit_FloatAnalyzer$Result.$clinit(); return otcit_FloatAnalyzer$Result;
        case "java.lang.InterruptedException": jl_InterruptedException.$clinit(); return jl_InterruptedException;
        case "java.io.Closeable": ji_Closeable.$clinit(); return ji_Closeable;
        case "java.util.HashMap$EntryIterator": ju_HashMap$EntryIterator.$clinit(); return ju_HashMap$EntryIterator;
        case "org.teavm.jso.core.JSArrayReader": otjc_JSArrayReader.$clinit(); return otjc_JSArrayReader;
        case "org.teavm.jso.browser.StorageProvider": otjb_StorageProvider.$clinit(); return otjb_StorageProvider;
        case "greenfoot.collision.ibsp.BSPNode": gci_BSPNode.$clinit(); return gci_BSPNode;
        case "java.io.InputStream": ji_InputStream.$clinit(); return ji_InputStream;
        default: return null;
    }
}
function otp_Platform_startThread(var$1) {
    return setTimeout(function() {
        $rt_threadStarter(otp_Platform_launchThread)(var$1);
    }, 0);
}
function otp_Platform_launchThread($runnable) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$runnable = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $runnable.$run();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($runnable, $ptr);
}
function otp_Platform_postpone($runnable) {
    otp_Platform_schedule($runnable, 0);
}
function otp_Platform_schedule(var$1, var$2) {
    return setTimeout(function() {
        otp_Platform_launchThread(var$1);
    }, var$2);
}
function otp_Platform_killSchedule($id) {
    $rt_globals.clearTimeout($id);
}
function otp_Platform_createQueue() {
    return otp_Platform_createQueueJs$js_body$_30();
}
function otp_Platform_isPrimitive($cls) {
    return $cls.$meta.primitive ? 1 : 0;
}
function otp_Platform_getArrayItem($cls) {
    return $cls.$meta.item;
}
function otp_Platform_getName($cls) {
    return $rt_str($cls.$meta.name);
}
function otp_Platform_createQueueJs$js_body$_30() {
    return [];
}
function jnc_Charset() {
    var a = this; jl_Object.call(a);
    a.$canonicalName = null;
    a.$aliases = null;
}
function jnc_Charset__init_($this, $canonicalName, $aliases) {
    var var$3, var$4, var$5, $alias;
    var$3 = $aliases.data;
    jl_Object__init_0($this);
    jnc_Charset_checkCanonicalName($canonicalName);
    var$4 = var$3.length;
    var$5 = 0;
    while (var$5 < var$4) {
        $alias = var$3[var$5];
        jnc_Charset_checkCanonicalName($alias);
        var$5 = var$5 + 1 | 0;
    }
    $this.$canonicalName = $canonicalName;
    $this.$aliases = $aliases.$clone();
}
function jnc_Charset_checkCanonicalName($name) {
    var $i, $c;
    if ($name.$isEmpty())
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    if (!jnc_Charset_isValidCharsetStart($name.$charAt(0)))
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    $i = 1;
    while ($i < $name.$length()) {
        a: {
            $c = $name.$charAt($i);
            switch ($c) {
                case 43:
                case 45:
                case 46:
                case 58:
                case 95:
                    break;
                default:
                    if (jnc_Charset_isValidCharsetStart($c))
                        break a;
                    else
                        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
            }
        }
        $i = $i + 1 | 0;
    }
}
function jnc_Charset_isValidCharsetStart($c) {
    var var$2;
    a: {
        b: {
            if (!($c >= 48 && $c <= 57) && !($c >= 97 && $c <= 122)) {
                if ($c < 65)
                    break b;
                if ($c > 90)
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
}
var gp_ActorDelegate = $rt_classWithoutFields(0);
function jnc_CodingErrorAction() {
    jl_Object.call(this);
    this.$name1 = null;
}
var jnc_CodingErrorAction_IGNORE = null;
var jnc_CodingErrorAction_REPLACE = null;
var jnc_CodingErrorAction_REPORT = null;
function jnc_CodingErrorAction_$callClinit() {
    jnc_CodingErrorAction_$callClinit = $rt_eraseClinit(jnc_CodingErrorAction);
    jnc_CodingErrorAction__clinit_();
}
function jnc_CodingErrorAction__init_(var_0) {
    var var_1 = new jnc_CodingErrorAction();
    jnc_CodingErrorAction__init_0(var_1, var_0);
    return var_1;
}
function jnc_CodingErrorAction__init_0($this, $name) {
    jnc_CodingErrorAction_$callClinit();
    jl_Object__init_0($this);
    $this.$name1 = $name;
}
function jnc_CodingErrorAction__clinit_() {
    jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(35));
    jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(36));
    jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(37));
}
var jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function jl_IllegalArgumentException__init_0() {
    var var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_0);
    return var_0;
}
function jl_IllegalArgumentException__init_1(var_0) {
    var var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_(var_1, var_0);
    return var_1;
}
function jl_IllegalArgumentException__init_2($this) {
    jl_RuntimeException__init_1($this);
}
function jl_IllegalArgumentException__init_($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function jnc_IllegalCharsetNameException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName = null;
}
function jnc_IllegalCharsetNameException__init_(var_0) {
    var var_1 = new jnc_IllegalCharsetNameException();
    jnc_IllegalCharsetNameException__init_0(var_1, var_0);
    return var_1;
}
function jnc_IllegalCharsetNameException__init_0($this, $charsetName) {
    jl_IllegalArgumentException__init_2($this);
    $this.$charsetName = $charsetName;
}
var ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount0 = 0;
}
function ju_AbstractList__init_($this) {
    ju_AbstractCollection__init_($this);
}
function ju_AbstractList_add($this, $e) {
    $this.$add1($this.$size0(), $e);
    return 1;
}
function ju_AbstractList_iterator($this) {
    return ju_AbstractList$1__init_($this);
}
function ju_AbstractList_hashCode($this) {
    var $hashCode, $iter, $elem;
    $hashCode = 1;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $elem = $iter.$next1();
        $hashCode = (31 * $hashCode | 0) + ($elem === null ? 0 : $elem.$hashCode0()) | 0;
    }
    return $hashCode;
}
function ju_AbstractList_equals($this, $other) {
    var $list, $i;
    if (!$rt_isInstance($other, ju_List))
        return 0;
    $list = $other;
    if ($this.$size0() != $list.$size0())
        return 0;
    $i = 0;
    while ($i < $list.$size0()) {
        if (!ju_Objects_equals($this.$get($i), $list.$get($i)))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
var ju_AbstractSequentialList = $rt_classWithoutFields(ju_AbstractList);
function ju_AbstractSequentialList__init_($this) {
    ju_AbstractList__init_($this);
}
function ju_AbstractSequentialList_get($this, $index) {
    var $iter;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $iter = $this.$listIterator($index);
    return $iter.$next1();
}
function ju_AbstractSequentialList_add($this, $index, $element) {
    var $iter;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $iter = $this.$listIterator($index);
    $iter.$add2($element);
}
function ju_AbstractSequentialList_iterator($this) {
    return $this.$listIterator0();
}
var ju_Deque = $rt_classWithoutFields(0);
function ju_LinkedList() {
    var a = this; ju_AbstractSequentialList.call(a);
    a.$firstEntry = null;
    a.$lastEntry = null;
    a.$size1 = 0;
}
function ju_LinkedList__init_() {
    var var_0 = new ju_LinkedList();
    ju_LinkedList__init_0(var_0);
    return var_0;
}
function ju_LinkedList__init_0($this) {
    ju_AbstractSequentialList__init_($this);
}
function ju_LinkedList_size($this) {
    return $this.$size1;
}
function ju_LinkedList_listIterator($this) {
    return ju_LinkedList$SequentialListIterator__init_($this, $this.$firstEntry, null, 0);
}
function ju_LinkedList_listIterator0($this, $index) {
    var $next, $i, $prev;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($index <= ($this.$size1 / 2 | 0)) {
        $next = $this.$firstEntry;
        $i = 0;
        while ($i < $index) {
            $next = $next.$next5;
            $i = $i + 1 | 0;
        }
        return ju_LinkedList$SequentialListIterator__init_($this, $next, $next === null ? null : $next.$previous, $index);
    }
    if ($index > $this.$size1)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $prev = $this.$lastEntry;
    $i = $index;
    while ($i < $this.$size1) {
        $prev = $prev.$previous;
        $i = $i + 1 | 0;
    }
    return ju_LinkedList$SequentialListIterator__init_($this, $prev === null ? null : $prev.$next5, $prev, $index);
}
function ju_LinkedList_poll($this) {
    var $entry;
    if ($this.$firstEntry === null)
        return null;
    $entry = $this.$firstEntry;
    $this.$firstEntry = $this.$firstEntry.$next5;
    if ($this.$firstEntry === null)
        $this.$lastEntry = null;
    else
        $this.$firstEntry.$previous = null;
    $this.$size1 = $this.$size1 - 1 | 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return $entry.$item;
}
function ju_LinkedList_removeLast($this) {
    if (!$this.$isEmpty())
        return $this.$pollLast();
    $rt_throw(ju_NoSuchElementException__init_());
}
function ju_LinkedList_pollLast($this) {
    var $entry;
    if ($this.$lastEntry === null)
        return null;
    $entry = $this.$lastEntry;
    $this.$lastEntry = $this.$lastEntry.$previous;
    if ($this.$lastEntry === null)
        $this.$firstEntry = null;
    else
        $this.$lastEntry.$next5 = null;
    $this.$size1 = $this.$size1 - 1 | 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return $entry.$item;
}
function ju_LinkedList_removeEntry($this, $entry) {
    if ($entry.$previous === null)
        $this.$firstEntry = $entry.$next5;
    else
        $entry.$previous.$next5 = $entry.$next5;
    if ($entry.$next5 === null)
        $this.$lastEntry = $entry.$previous;
    else
        $entry.$next5.$previous = $entry.$previous;
    $this.$size1 = $this.$size1 - 1 | 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
}
var ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException);
function ju_NoSuchElementException__init_() {
    var var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_0(var_0);
    return var_0;
}
function ju_NoSuchElementException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out0 = null;
}
function ji_FilterOutputStream__init_(var_0) {
    var var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_0(var_1, var_0);
    return var_1;
}
function ji_FilterOutputStream__init_0($this, $out) {
    ji_OutputStream__init_($this);
    $this.$out0 = $out;
}
function ji_PrintStream() {
    var a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$errorState = 0;
    a.$sb = null;
    a.$buffer1 = null;
    a.$charset0 = null;
}
function ji_PrintStream__init_(var_0, var_1) {
    var var_2 = new ji_PrintStream();
    ji_PrintStream__init_0(var_2, var_0, var_1);
    return var_2;
}
function ji_PrintStream__init_0($this, $out, $autoFlush) {
    ji_FilterOutputStream__init_0($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer1 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    jnci_UTF8Charset_$callClinit();
    $this.$charset0 = jnci_UTF8Charset_INSTANCE;
}
function ji_PrintStream_write($this, $b, $off, $len) {
    var $$je;
    if (!ji_PrintStream_check($this))
        return;
    a: {
        try {
            $this.$out0.$write($b, $off, $len);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
            } else {
                throw $$e;
            }
        }
        $this.$errorState = 1;
    }
}
function ji_PrintStream_check($this) {
    if ($this.$out0 === null)
        $this.$errorState = 1;
    return $this.$errorState ? 0 : 1;
}
function ji_PrintStream_print($this, $s, $begin, $end) {
    var var$4, $src, $destBytes, $dest, var$8, var$9, $encoder, $overflow;
    var$4 = $s.data;
    $src = jn_CharBuffer_wrap($s, $begin, $end - $begin | 0);
    $destBytes = $rt_createByteArray(jl_Math_max(16, jl_Math_min(var$4.length, 1024)));
    $dest = jn_ByteBuffer_wrap0($destBytes);
    var$8 = $this.$charset0.$newEncoder();
    jnc_CodingErrorAction_$callClinit();
    var$9 = jnc_CodingErrorAction_REPLACE;
    var$8 = jnc_CharsetEncoder_onMalformedInput(var$8, var$9);
    var$9 = jnc_CodingErrorAction_REPLACE;
    $encoder = jnc_CharsetEncoder_onUnmappableCharacter(var$8, var$9);
    while (true) {
        $overflow = (jnc_CharsetEncoder_encode($encoder, $src, $dest, 1)).$isOverflow();
        $this.$write($destBytes, 0, jn_Buffer_position($dest));
        jn_ByteBuffer_clear($dest);
        if (!$overflow)
            break;
    }
    while (true) {
        $overflow = (jnc_CharsetEncoder_flush($encoder, $dest)).$isOverflow();
        $this.$write($destBytes, 0, jn_Buffer_position($dest));
        jn_ByteBuffer_clear($dest);
        if (!$overflow)
            break;
    }
}
function ji_PrintStream_print0($this, $c) {
    $this.$buffer1.data[0] = $c;
    ji_PrintStream_print($this, $this.$buffer1, 0, 1);
}
function ji_PrintStream_print1($this, $s) {
    $this.$sb.$append8($s);
    ji_PrintStream_printSB($this);
}
function ji_PrintStream_println($this, $s) {
    ($this.$sb.$append8($s)).$append0(10);
    ji_PrintStream_printSB($this);
}
function ji_PrintStream_println0($this, $s) {
    ($this.$sb.$append($s)).$append0(10);
    ji_PrintStream_printSB($this);
}
function ji_PrintStream_println1($this) {
    $this.$print1(10);
}
function ji_PrintStream_printSB($this) {
    var $buffer;
    $buffer = $this.$sb.$length() <= $this.$buffer1.data.length ? $this.$buffer1 : $rt_createCharArray($this.$sb.$length());
    $this.$sb.$getChars(0, $this.$sb.$length(), $buffer, 0);
    ji_PrintStream_print($this, $buffer, 0, $this.$sb.$length());
    $this.$sb.$setLength(0);
}
var oti_AsyncCallback = $rt_classWithoutFields(0);
function g_GreenfootImage() {
    var a = this; jl_Object.call(a);
    a.$imageFileName = null;
    a.$image0 = null;
    a.$g2d = null;
    a.$currentColor = null;
    a.$currentFont = null;
    a.$copyOnWrite = 0;
    a.$transparency = 0;
}
var g_GreenfootImage_DEFAULT_FOREGROUND = null;
function g_GreenfootImage_$callClinit() {
    g_GreenfootImage_$callClinit = $rt_eraseClinit(g_GreenfootImage);
    g_GreenfootImage__clinit_();
}
function g_GreenfootImage__init_2(var_0) {
    var var_1 = new g_GreenfootImage();
    g_GreenfootImage__init_(var_1, var_0);
    return var_1;
}
function g_GreenfootImage__init_0(var_0, var_1) {
    var var_2 = new g_GreenfootImage();
    g_GreenfootImage__init_3(var_2, var_0, var_1);
    return var_2;
}
function g_GreenfootImage__init_4(var_0) {
    var var_1 = new g_GreenfootImage();
    g_GreenfootImage__init_5(var_1, var_0);
    return var_1;
}
function g_GreenfootImage__init_6() {
    var var_0 = new g_GreenfootImage();
    g_GreenfootImage__init_1(var_0);
    return var_0;
}
function g_GreenfootImage__init_($this, $filename) {
    var $gImage, $ile, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$ile = $thread.pop();$gImage = $thread.pop();$filename = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_GreenfootImage_$callClinit();
        jl_Object__init_0($this);
        $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
        $this.$copyOnWrite = 0;
        $this.$transparency = 255;
        $gImage = gu_GreenfootUtil_getCachedImage($filename);
        if ($gImage !== null) {
            $this.$createClone($gImage);
            if (gu_GreenfootUtil_addCachedImage($filename, g_GreenfootImage__init_4($this)))
                $this.$copyOnWrite = 1;
            return;
        }
        try {
            $ptr = 1;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_IllegalArgumentException) {
                $ile = $$je;
            } else {
                throw $$e;
            }
        }
        gu_GreenfootUtil_addCachedImage($filename, null);
        $rt_throw($ile);
    case 1:
        a: {
            try {
                g_GreenfootImage_loadFile($this, $filename);
                if ($rt_suspending()) {
                    break main;
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_IllegalArgumentException) {
                    $ile = $$je;
                } else {
                    throw $$e;
                }
            }
            gu_GreenfootUtil_addCachedImage($filename, null);
            $rt_throw($ile);
        }
        if (gu_GreenfootUtil_addCachedImage($filename, g_GreenfootImage__init_4($this)))
            $this.$copyOnWrite = 1;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $filename, $gImage, $ile, $ptr);
}
function g_GreenfootImage__init_3($this, $width, $height) {
    var var$3, var$4, var$5;
    g_GreenfootImage_$callClinit();
    jl_Object__init_0($this);
    $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
    $this.$copyOnWrite = 0;
    $this.$transparency = 255;
    $this.$image0 = (otjdh_HTMLDocument_current()).createElement("canvas");
    var$3 = $this.$image0;
    var$4 = $width;
    var$3.width = var$4;
    var$5 = $this.$image0;
    var$3 = $height;
    var$5.height = var$3;
    g_GreenfootImage_setupRenderContext($this);
}
function g_GreenfootImage__init_5($this, $image) {
    var var$2, var$3, var$4;
    g_GreenfootImage_$callClinit();
    jl_Object__init_0($this);
    $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
    $this.$copyOnWrite = 0;
    $this.$transparency = 255;
    if ($image.$copyOnWrite) {
        $this.$image0 = $image.$image0;
        $this.$copyOnWrite = 1;
    } else {
        var$2 = (otjdh_HTMLDocument_current()).createElement("canvas");
        var$3 = $image.$getWidth();
        var$2.width = var$3;
        var$3 = $image.$getHeight();
        var$2.height = var$3;
        $this.$image0 = var$2;
        $this.$g2d = var$2.getContext("2d");
        if (var$2.width > 0 && var$2.height > 0) {
            var$3 = $this.$g2d;
            var$4 = $image.$image0;
            var$3.drawImage(var$4, 0.0, 0.0);
        }
        $this.$g2d.translate(0.5, 0.5);
    }
    g_GreenfootImage_copyStates($image, $this);
}
function g_GreenfootImage_setupRenderContext($this) {
    $this.$g2d = $this.$image0.getContext("2d");
    $this.$g2d.translate(0.5, 0.5);
}
function g_GreenfootImage_getRenderContext($this, $image) {
    var var$2;
    var$2 = $image.getContext("2d");
    var$2.translate(0.5, 0.5);
    return var$2;
}
function g_GreenfootImage_toJsColor($this, $c) {
    return ((((((((((jl_StringBuilder__init_()).$append8($rt_s(38))).$append1($c.$getRed())).$append8($rt_s(39))).$append1($c.$getGreen())).$append8($rt_s(39))).$append1($c.$getBlue())).$append8($rt_s(39))).$append9($c.$getAlpha() / 255.0)).$append8($rt_s(40))).$toString();
}
function g_GreenfootImage__init_1($this) {
    g_GreenfootImage_$callClinit();
    jl_Object__init_0($this);
    $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
    $this.$copyOnWrite = 0;
    $this.$transparency = 255;
}
function g_GreenfootImage_getCopyOnWriteClone($this) {
    var $clone;
    $clone = g_GreenfootImage__init_6();
    $clone.$copyOnWrite = 1;
    $clone.$image0 = $this.$image0;
    $clone.$g2d = $this.$g2d;
    g_GreenfootImage_copyStates($this, $clone);
    return $clone;
}
function g_GreenfootImage_createClone($this, $cachedImage) {
    $this.$copyOnWrite = 1;
    $this.$image0 = $cachedImage.$image0;
    $this.$g2d = $cachedImage.$g2d;
    g_GreenfootImage_copyStates($cachedImage, $this);
}
function g_GreenfootImage_copyStates($src, $dst) {
    g_GreenfootImage_$callClinit();
    $dst.$imageFileName = $src.$imageFileName;
    $dst.$currentColor = $src.$currentColor;
    $dst.$currentFont = $src.$currentFont;
    $dst.$transparency = $src.$transparency;
}
function g_GreenfootImage_loadFile($this, $filename) {
    var $document, $imgElement, var$4, $sync, $success, var$7, $url, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$url = $thread.pop();var$7 = $thread.pop();$success = $thread.pop();$sync = $thread.pop();var$4 = $thread.pop();$imgElement = $thread.pop();$document = $thread.pop();$filename = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($filename === null)
            $rt_throw(jl_NullPointerException__init_0($rt_s(41)));
        $this.$imageFileName = $filename;
        $document = otjdh_HTMLDocument_current();
        $imgElement = $document.createElement("img");
        if (!$filename.$startsWith($rt_s(42)) && !$filename.$startsWith($rt_s(43))) {
            var$4 = (((jl_StringBuilder__init_()).$append8($rt_s(44))).$append8($filename)).$toString();
            $ptr = 2;
            continue main;
        }
        $imgElement.setAttribute("src", $rt_ustr($filename));
        $sync = jl_Object__init_();
        $success = $rt_createBooleanArray(1);
        otjde_LoadEventTarget_listenLoad$static($imgElement, g_GreenfootImage$1__init_($this, $sync, $success));
        var$7 = g_GreenfootImage$2__init_($this, $sync, $success);
        $imgElement.addEventListener("error", otji_JS_function(var$7, "handleEvent"));
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($sync);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                try {
                    $ptr = 3;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_InterruptedException) {
                    } else {
                        throw $$e;
                    }
                }
                jl_Object_monitorExit($sync);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;

            }
            jl_Object_monitorExit($sync);
            $rt_throw(var$4);
        }
        if (!$success.data[0])
            $rt_throw(jl_IllegalArgumentException__init_0());
        var$4 = $document.createElement("canvas");
        var$7 = $imgElement.width;
        var$4.width = var$7;
        var$7 = $imgElement.height;
        var$4.height = var$7;
        $this.$image0 = var$4;
        g_GreenfootImage_setupRenderContext($this);
        if ($imgElement.width > 0 && $imgElement.height > 0)
            $this.$g2d.drawImage($imgElement, (-0.5), (-0.5));
        return;
    case 2:
        $tmp = gj_Client_getCachedResourceURL(var$4);
        if ($rt_suspending()) {
            break main;
        }
        $url = $tmp;
        if ($url === null) {
            $ptr = 4;
            continue main;
        }
        if ($url !== null)
            $filename = $url;
        $imgElement.setAttribute("src", $rt_ustr($filename));
        $sync = jl_Object__init_();
        $success = $rt_createBooleanArray(1);
        otjde_LoadEventTarget_listenLoad$static($imgElement, g_GreenfootImage$1__init_($this, $sync, $success));
        var$7 = g_GreenfootImage$2__init_($this, $sync, $success);
        $imgElement.addEventListener("error", otji_JS_function(var$7, "handleEvent"));
        $ptr = 1;
        continue main;
    case 3:
        a: {
            try {
                b: {
                    try {
                        jl_Object_wait1($sync);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                }
                jl_Object_monitorExit($sync);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;

            }
            jl_Object_monitorExit($sync);
            $rt_throw(var$4);
        }
        if (!$success.data[0])
            $rt_throw(jl_IllegalArgumentException__init_0());
        var$4 = $document.createElement("canvas");
        var$7 = $imgElement.width;
        var$4.width = var$7;
        var$7 = $imgElement.height;
        var$4.height = var$7;
        $this.$image0 = var$4;
        g_GreenfootImage_setupRenderContext($this);
        if ($imgElement.width > 0 && $imgElement.height > 0)
            $this.$g2d.drawImage($imgElement, (-0.5), (-0.5));
        return;
    case 4:
        $tmp = gj_Client_getCachedResourceURL($filename);
        if ($rt_suspending()) {
            break main;
        }
        $url = $tmp;
        if ($url !== null)
            $filename = $url;
        $imgElement.setAttribute("src", $rt_ustr($filename));
        $sync = jl_Object__init_();
        $success = $rt_createBooleanArray(1);
        otjde_LoadEventTarget_listenLoad$static($imgElement, g_GreenfootImage$1__init_($this, $sync, $success));
        var$7 = g_GreenfootImage$2__init_($this, $sync, $success);
        $imgElement.addEventListener("error", otji_JS_function(var$7, "handleEvent"));
        $ptr = 1;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $filename, $document, $imgElement, var$4, $sync, $success, var$7, $url, $ptr);
}
function g_GreenfootImage_drawToCanvas($this, $g2d, $x, $y) {
    var var$4;
    if ($this.$image0.width && $this.$image0.height) {
        var$4 = $this.$image0;
        $g2d.drawImage(var$4, $x, $y);
    }
}
function g_GreenfootImage_getWidth($this) {
    return $this.$image0.width;
}
function g_GreenfootImage_getHeight($this) {
    return $this.$image0.height;
}
function g_GreenfootImage_fill($this) {
    $this.$fillRect(0, 0, $this.$image0.width + 1 | 0, $this.$image0.height + 1 | 0);
}
function g_GreenfootImage_drawImage($this, $image, $x, $y) {
    if ($image.$getHeight() && $image.$getWidth()) {
        g_GreenfootImage_ensureWritableImage($this);
        $image.$drawToCanvas($this.$g2d, $x - 0.5, $y - 0.5);
    }
}
function g_GreenfootImage_setColor($this, $color) {
    $this.$currentColor = $color;
}
function g_GreenfootImage_getTransparency($this) {
    return $this.$transparency;
}
function g_GreenfootImage_fillRect($this, $x, $y, $width, $height) {
    var var$5, var$6, var$7, var$8, var$9, var$10;
    g_GreenfootImage_ensureWritableImage($this);
    var$5 = $this.$g2d;
    var$6 = $rt_ustr(g_GreenfootImage_toJsColor($this, $this.$currentColor));
    var$5.fillStyle = var$6;
    var$6 = $this.$g2d;
    var$7 = $x - 0.5;
    var$8 = $y - 0.5;
    var$9 = $width;
    var$10 = $height;
    var$6.fillRect(var$7, var$8, var$9, var$10);
}
function g_GreenfootImage_ensureWritableImage($this) {
    var var$1, var$2, $g;
    if ($this.$copyOnWrite) {
        var$1 = (otjdh_HTMLDocument_current()).createElement("canvas");
        var$2 = $this.$image0.width;
        var$1.width = var$2;
        var$2 = $this.$image0.height;
        var$1.height = var$2;
        $g = g_GreenfootImage_getRenderContext($this, var$1);
        var$2 = $this.$image0;
        $g.drawImage(var$2, 0.0, 0.0);
        $this.$image0 = var$1;
        $this.$g2d = $g;
        $this.$copyOnWrite = 0;
    }
}
function g_GreenfootImage__clinit_() {
    g_Color_$callClinit();
    g_GreenfootImage_DEFAULT_FOREGROUND = g_Color_BLACK;
}
function ju_AbstractMap() {
    jl_Object.call(this);
    this.$cachedKeySet = null;
}
function ju_AbstractMap__init_($this) {
    jl_Object__init_0($this);
}
var jlr_AnnotatedElement = $rt_classWithoutFields(0);
var jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name2 = null;
    a.$platformClass = null;
}
function jl_Class__init_(var_0) {
    var var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
}
function jl_Class__init_0($this, $platformClass) {
    var var$2;
    jl_Object__init_0($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
}
function jl_Class_getClass($cls) {
    var $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_($cls);
    return $result;
}
function jl_Class_getPlatformClass($this) {
    return $this.$platformClass;
}
function jl_Class_isInstance($this, $obj) {
    return otp_Platform_isInstance($obj, $this.$platformClass);
}
function jl_Class_isAssignableFrom($this, $obj) {
    return otp_Platform_isAssignable($obj.$getPlatformClass(), $this.$platformClass);
}
function jl_Class_getName($this) {
    if ($this.$name2 === null)
        $this.$name2 = otp_Platform_getName($this.$platformClass);
    return $this.$name2;
}
function jl_Class_isPrimitive($this) {
    return otp_Platform_isPrimitive($this.$platformClass);
}
function jl_Class_getComponentType($this) {
    return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
}
function jl_Class_getSuperclass($this) {
    return jl_Class_getClass($this.$platformClass.$meta.superclass);
}
function jl_Class_forName($name) {
    var $cls, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$cls = $thread.pop();$name = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $cls = otp_Platform_lookupClass($name.$toString());
        if ($cls !== null)
            return jl_Class_getClass($cls);
        $rt_throw(jl_ClassNotFoundException__init_0());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($name, $cls, $ptr);
}
function jl_Class_newInstance($this) {
    var var$1, $instance, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$instance = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = $this.$platformClass;
        $ptr = 1;
    case 1:
        $tmp = otp_Platform_newInstance(var$1);
        if ($rt_suspending()) {
            break main;
        }
        $instance = $tmp;
        if ($instance !== null)
            return $instance;
        $rt_throw(jl_InstantiationException__init_());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $instance, $ptr);
}
function gc_ImageCache$CachedImageRef() {
    var a = this; jl_Object.call(a);
    a.$imgName = null;
    a.$image1 = null;
    a.$this$03 = null;
}
function gc_ImageCache$CachedImageRef__init_(var_0, var_1, var_2) {
    var var_3 = new gc_ImageCache$CachedImageRef();
    gc_ImageCache$CachedImageRef__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gc_ImageCache$CachedImageRef__init_0($this, var$1, $imgName, $image) {
    $this.$this$03 = var$1;
    jl_Object__init_0($this);
    $this.$imgName = $imgName;
    $this.$image1 = $image;
}
function gc_ImageCache$CachedImageRef_get($this) {
    return $this.$image1;
}
var ju_Arrays = $rt_classWithoutFields();
function ju_Arrays__init_0() {
    var var_0 = new ju_Arrays();
    ju_Arrays__init_(var_0);
    return var_0;
}
function ju_Arrays__init_($this) {
    jl_Object__init_0($this);
}
function ju_Arrays_copyOf($array, $length) {
    var var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_copyOf0($array, $length) {
    var var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createByteArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_copyOf1($original, $newLength) {
    var var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance((jl_Object_getClass($original)).$getComponentType(), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_fill($a, $fromIndex, $toIndex, $val) {
    var var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
}
function ju_Arrays_fill0($a, $val) {
    ju_Arrays_fill($a, 0, $a.data.length, $val);
}
function ju_Arrays_binarySearch($a, $key) {
    return ju_Arrays_binarySearch0($a, 0, $a.data.length, $key);
}
function ju_Arrays_binarySearch0($a, $fromIndex, $toIndex, $key) {
    var var$5, $u, var$7, $i, $e;
    var$5 = $rt_compare($fromIndex, $toIndex);
    if (var$5 > 0)
        $rt_throw(jl_IllegalArgumentException__init_0());
    if (!var$5)
        return (-1);
    $u = $toIndex - 1 | 0;
    while (true) {
        var$7 = $a.data;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $e = var$7[$i];
        if ($e == $key)
            break;
        if ($key >= $e) {
            $fromIndex = $i + 1 | 0;
            if ($fromIndex > $u)
                return ( -$i | 0) - 2 | 0;
        } else {
            $u = $i - 1 | 0;
            if ($u < $fromIndex)
                return ( -$i | 0) - 1 | 0;
        }
    }
    return $i;
}
var gci_BSPNodeCache = $rt_classWithoutFields();
var gci_BSPNodeCache_cache = null;
var gci_BSPNodeCache_tail = 0;
var gci_BSPNodeCache_size = 0;
function gci_BSPNodeCache_$callClinit() {
    gci_BSPNodeCache_$callClinit = $rt_eraseClinit(gci_BSPNodeCache);
    gci_BSPNodeCache__clinit_();
}
function gci_BSPNodeCache__init_0() {
    var var_0 = new gci_BSPNodeCache();
    gci_BSPNodeCache__init_(var_0);
    return var_0;
}
function gci_BSPNodeCache__init_($this) {
    gci_BSPNodeCache_$callClinit();
    jl_Object__init_0($this);
}
function gci_BSPNodeCache_getBSPNode() {
    var $ppos, $node;
    gci_BSPNodeCache_$callClinit();
    if (!gci_BSPNodeCache_size)
        return gci_BSPNode__init_(gci_Rect__init_(0, 0, 0, 0), 0, 0);
    $ppos = gci_BSPNodeCache_tail - gci_BSPNodeCache_size | 0;
    if ($ppos < 0)
        $ppos = $ppos + 1000 | 0;
    $node = gci_BSPNodeCache_cache.data[$ppos];
    gci_BSPNode_setParent($node, null);
    gci_BSPNodeCache_size = gci_BSPNodeCache_size - 1 | 0;
    return $node;
}
function gci_BSPNodeCache_returnNode($node) {
    var var$2, var$3;
    gci_BSPNodeCache_$callClinit();
    gci_BSPNode_blankNode($node);
    var$2 = gci_BSPNodeCache_cache.data;
    var$3 = gci_BSPNodeCache_tail;
    gci_BSPNodeCache_tail = var$3 + 1 | 0;
    var$2[var$3] = $node;
    if (gci_BSPNodeCache_tail == 1000)
        gci_BSPNodeCache_tail = 0;
    gci_BSPNodeCache_size = jl_Math_min(gci_BSPNodeCache_size + 1 | 0, 1000);
    if (gci_BSPNode_getLeft($node) === null && gci_BSPNode_getRight($node) === null)
        return;
    $rt_throw(jl_RuntimeException__init_($rt_s(45)));
}
function gci_BSPNodeCache__clinit_() {
    gci_BSPNodeCache_cache = $rt_createArray(gci_BSPNode, 1000);
    gci_BSPNodeCache_tail = 0;
    gci_BSPNodeCache_size = 0;
}
function gj_MouseManager() {
    var a = this; jl_Object.call(a);
    a.$currentData = null;
    a.$futureData = null;
    a.$potentialNewDragData = null;
    a.$locator = null;
    a.$dragStartData = null;
    a.$isDragging = 0;
    a.$gotNewEvent = 0;
    a.$button1state = 0;
    a.$documentListener = null;
    a.$touchId = 0;
    a.$trackingTouch = 0;
}
function gj_MouseManager__init_(var_0) {
    var var_1 = new gj_MouseManager();
    gj_MouseManager__init_0(var_1, var_0);
    return var_1;
}
function gj_MouseManager__init_0($this, $locator) {
    jl_Object__init_0($this);
    $this.$currentData = ggim_MouseEventData__init_0();
    $this.$futureData = ggim_MouseEventData__init_0();
    $this.$potentialNewDragData = ggim_MouseEventData__init_0();
    $this.$dragStartData = ggim_MouseEventData__init_0();
    $this.$button1state = 0;
    $this.$documentListener = gj_MouseManager$1__init_($this);
    $this.$trackingTouch = 0;
    $this.$locator = $locator;
}
function gj_MouseManager_newActStarted($this) {
    var $newData;
    jl_Object_monitorEnterSync($this);
    try {
        if (!$this.$gotNewEvent)
            $this.$currentData.$init0();
        else {
            $newData = ggim_MouseEventData__init_0();
            $this.$currentData = $this.$futureData;
            $this.$futureData = $newData;
            $this.$potentialNewDragData = ggim_MouseEventData__init_0();
            $this.$gotNewEvent = 0;
        }
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gj_MouseManager_registerEventRecieved($this) {
    $this.$gotNewEvent = 1;
}
function gj_MouseManager_handleEvent($this, $e) {
    var $etype, var$3;
    $etype = $rt_str($e.type);
    $e.stopPropagation();
    $e.preventDefault();
    var$3 = jl_Thread__init_3(gj_MouseManager$handleEvent$lambda$_10_0__init_($this, $etype, $e));
    var$3.$start();
}
function gj_MouseManager_handleTouchEvent($this, $e) {
    var $etype, var$3;
    $etype = $rt_str($e.type);
    $e.stopPropagation();
    $e.preventDefault();
    var$3 = jl_Thread__init_3(gj_MouseManager$handleTouchEvent$lambda$_11_0__init_($this, $etype, $e));
    var$3.$start();
}
function gj_MouseManager_findTouch($this, $list, $touchId) {
    var $i, $touch;
    $i = 0;
    while (true) {
        $touch = $list.item($i);
        if ($touch === null)
            return null;
        if ($touch.identifier == $touchId)
            break;
        $i = $i + 1 | 0;
    }
    return $touch;
}
function gj_MouseManager_mouseClicked($this, $x, $y, $button, $clickCount) {
    var $actor, $mouseData, var$7, var$8, var$9, $$je;
    $actor = $this.$locator.$getTopMostActorAt($x, $y);
    jl_Object_monitorEnterSync($this);
    a: {
        try {
            $mouseData = $this.$futureData;
            if ($this.$futureData.$isMouseDragEnded(null))
                $mouseData = $this.$potentialNewDragData;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$7 = $$je;
            break a;

        }
        b: {
            try {
                if (ggim_PriorityManager_isHigherPriority($rt_s(46), $mouseData))
                    break b;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$7 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            var$8 = $this.$locator.$getTranslatedX($x);
            var$9 = $this.$locator.$getTranslatedY($y);
            $mouseData.$mouseClicked(var$8, var$9, $button, $clickCount, $actor);
            $this.$isDragging = 0;
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$7 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$7);
}
function gj_MouseManager_mouseExited($this) {
    var var$1, $$je;
    jl_Object_monitorEnterSync($this);
    a: {
        try {
            $this.$futureData.$mouseExited();
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$1 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$1);
}
function gj_MouseManager_mousePressed($this, $px, $py, $button) {
    var $actor, $mouseData, var$6, $x, $y, $$je;
    $actor = $this.$locator.$getTopMostActorAt($px, $py);
    jl_Object_monitorEnterSync($this);
    a: {
        try {
            $mouseData = $this.$futureData;
            if ($this.$futureData.$isMouseDragEnded(null))
                $mouseData = $this.$potentialNewDragData;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$6 = $$je;
            break a;

        }
        b: {
            try {
                $this.$dragStartData = ggim_MouseEventData__init_0();
                $x = $this.$locator.$getTranslatedX($px);
                $y = $this.$locator.$getTranslatedY($py);
                $this.$dragStartData.$mousePressed($x, $y, $button, $actor);
                if (ggim_PriorityManager_isHigherPriority($rt_s(47), $mouseData))
                    break b;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            $mouseData.$mousePressed($x, $y, $button, $actor);
            $this.$isDragging = 0;
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$6 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$6);
}
function gj_MouseManager_mouseReleased($this, $px, $py, $button) {
    var $clickActor, var$5, $x, $y, $actor, $$je;
    $clickActor = $this.$locator.$getTopMostActorAt($px, $py);
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            try {
                if (!$this.$isDragging)
                    break b;
                if ($this.$futureData.$isMouseDragEnded(null))
                    $this.$futureData = $this.$potentialNewDragData;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$5 = $$je;
                break a;

            }
            c: {
                try {
                    if (ggim_PriorityManager_isHigherPriority($rt_s(48), $this.$futureData))
                        break c;
                    jl_Object_monitorExitSync($this);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$5 = $$je;
                    break a;

                }
                return;
            }
            try {
                gj_MouseManager_registerEventRecieved($this);
                $x = $this.$locator.$getTranslatedX($px);
                $y = $this.$locator.$getTranslatedY($py);
                $this.$futureData.$mouseClicked($x, $y, $button, 1, $clickActor);
                $actor = $this.$dragStartData.$getActor();
                $this.$futureData.$mouseDragEnded($x, $y, $button, $actor);
                $this.$isDragging = 0;
                $this.$potentialNewDragData = ggim_MouseEventData__init_0();
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$5 = $$je;
                break a;

            }
        }
        try {
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$5 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$5);
}
function gj_MouseManager_mouseDragged($this, $px, $py, $buttons) {
    var var$4, $x, $y, $$je;
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            try {
                $this.$isDragging = 1;
                if (ggim_PriorityManager_isHigherPriority($rt_s(49), $this.$futureData))
                    break b;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            $x = $this.$locator.$getTranslatedX($px);
            $y = $this.$locator.$getTranslatedY($py);
            $this.$futureData.$mouseDragged($x, $y, $this.$dragStartData.$getButton(), $this.$dragStartData.$getActor());
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$4);
}
function gj_MouseManager_mouseMoved($this, $px, $py) {
    var $actor, var$4, $x, $y, $$je;
    $actor = $this.$locator.$getTopMostActorAt($px, $py);
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            try {
                if (ggim_PriorityManager_isHigherPriority($rt_s(50), $this.$futureData))
                    break b;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            $x = $this.$locator.$getTranslatedX($px);
            $y = $this.$locator.$getTranslatedY($py);
            $this.$futureData.$mouseMoved($x, $y, 0, $actor);
            $this.$isDragging = 0;
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$4);
}
function gj_MouseManager_handleEvent0($this, var$1) {
    $this.$handleEvent1(var$1);
}
function gj_MouseManager_lambda$handleTouchEvent$1($this, $etype, $e) {
    var var$3, $touch;
    a: {
        var$3 = (-1);
        switch ($etype.$hashCode0()) {
            case -1578593149:
                if (!$etype.$equals($rt_s(51)))
                    break a;
                var$3 = 0;
                break a;
            case -819532484:
                if (!$etype.$equals($rt_s(52)))
                    break a;
                var$3 = 1;
                break a;
            case 364536720:
                if (!$etype.$equals($rt_s(53)))
                    break a;
                var$3 = 3;
                break a;
            case 2127979129:
                if (!$etype.$equals($rt_s(54)))
                    break a;
                var$3 = 2;
                break a;
            default:
        }
    }
    b: {
        c: {
            d: {
                switch (var$3) {
                    case 0:
                        break d;
                    case 1:
                    case 2:
                        break c;
                    case 3:
                        break;
                    default:
                        break b;
                }
                if (!$this.$trackingTouch)
                    break b;
                $touch = gj_MouseManager_findTouch($this, $e.changedTouches, $this.$touchId);
                if ($touch !== null)
                    gj_MouseManager_mouseDragged($this, $touch.clientX, $touch.clientY, 1);
                break b;
            }
            if ($this.$trackingTouch)
                break b;
            $touch = $e.changedTouches.item(0);
            $this.$touchId = $touch.identifier;
            gj_MouseManager_mousePressed($this, $touch.clientX, $touch.clientY, 1);
            $this.$button1state = 1;
            $this.$trackingTouch = 1;
            break b;
        }
        if ($this.$trackingTouch) {
            $touch = gj_MouseManager_findTouch($this, $e.changedTouches, $this.$touchId);
            if ($touch !== null) {
                gj_MouseManager_mouseReleased($this, $touch.clientX, $touch.clientY, 1);
                $this.$button1state = 0;
                if ($etype.$equals($rt_s(52)))
                    gj_MouseManager_mouseClicked($this, $touch.clientX, $touch.clientY, 1, 1);
                $this.$trackingTouch = 0;
            }
        }
    }
}
function gj_MouseManager_lambda$handleEvent$0($this, $etype, $e) {
    var var$3, var$4, var$5;
    a: {
        var$3 = (-1);
        switch ($etype.$hashCode0()) {
            case -1844879718:
                if (!$etype.$equals($rt_s(55)))
                    break a;
                var$3 = 5;
                break a;
            case 94750088:
                if (!$etype.$equals($rt_s(46)))
                    break a;
                var$3 = 4;
                break a;
            case 586843847:
                if (!$etype.$equals($rt_s(47)))
                    break a;
                var$3 = 3;
                break a;
            case 587111926:
                if (!$etype.$equals($rt_s(50)))
                    break a;
                var$3 = 6;
                break a;
            case 1013180755:
                if (!$etype.$equals($rt_s(56)))
                    break a;
                var$3 = 0;
                break a;
            case 1019359538:
                if (!$etype.$equals($rt_s(57)))
                    break a;
                var$3 = 1;
                break a;
            case 1243067904:
                if (!$etype.$equals($rt_s(48)))
                    break a;
                var$3 = 2;
                break a;
            default:
        }
    }
    b: {
        c: {
            d: {
                switch (var$3) {
                    case 0:
                        break;
                    case 1:
                        gj_MouseManager_mouseExited($this);
                        break b;
                    case 2:
                        break c;
                    case 3:
                        break d;
                    case 4:
                        if ($e.button == 2)
                            break b;
                        gj_MouseManager_mouseClicked($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16, 1);
                        break b;
                    case 5:
                        gj_MouseManager_mouseClicked($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16, 2);
                        break b;
                    case 6:
                        if (!$this.$button1state) {
                            gj_MouseManager_mouseMoved($this, $e.clientX, $e.clientY);
                            break b;
                        }
                        gj_MouseManager_mouseDragged($this, $e.clientX, $e.clientY, 1);
                        break b;
                    default:
                        break b;
                }
                break b;
            }
            gj_MouseManager_mousePressed($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16);
            if ($e.button)
                break b;
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $this.$documentListener;
            var$4.addEventListener("mousemove", otji_JS_function(var$5, "handleEvent"));
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $this.$documentListener;
            var$4.addEventListener("mouseup", otji_JS_function(var$5, "handleEvent"));
            $this.$button1state = 1;
            break b;
        }
        gj_MouseManager_mouseReleased($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16);
        if (!$e.button) {
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $this.$documentListener;
            var$4.removeEventListener("mousemove", otji_JS_function(var$5, "handleEvent"));
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $this.$documentListener;
            var$4.removeEventListener("mouseup", otji_JS_function(var$5, "handleEvent"));
            $this.$button1state = 0;
        } else if ($e.button == 2)
            gj_MouseManager_mouseClicked($this, $e.clientX, $e.clientY, 3, 1);
    }
}
function gj_MouseManager_access$000($x0, $x1, $x2, $x3) {
    gj_MouseManager_mouseDragged($x0, $x1, $x2, $x3);
}
function gj_MouseManager_access$102($x0, $x1) {
    $x0.$button1state = $x1;
    return $x1;
}
function gj_MouseManager_access$200($x0, $x1, $x2, $x3) {
    gj_MouseManager_mouseReleased($x0, $x1, $x2, $x3);
}
function gj_MouseManager_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
var ggim_WorldLocator = $rt_classWithoutFields(0);
function gc_WorldHandler$1() {
    jl_Object.call(this);
    this.$this$04 = null;
}
function gc_WorldHandler$1__init_(var_0) {
    var var_1 = new gc_WorldHandler$1();
    gc_WorldHandler$1__init_0(var_1, var_0);
    return var_1;
}
function gc_WorldHandler$1__init_0($this, $this$0) {
    $this.$this$04 = $this$0;
    jl_Object__init_0($this);
}
function gc_WorldHandler$1_handleEvent($this, $ev) {
    $ev.preventDefault();
}
function gc_WorldHandler$1_handleEvent0($this, var$1) {
    $this.$handleEvent1(var$1);
}
function gc_WorldHandler$1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
var jl_System = $rt_classWithoutFields();
var jl_System_outCache = null;
var jl_System_errCache = null;
function jl_System__init_0() {
    var var_0 = new jl_System();
    jl_System__init_(var_0);
    return var_0;
}
function jl_System__init_($this) {
    jl_Object__init_0($this);
}
function jl_System_out() {
    var var$1;
    if (jl_System_outCache === null) {
        var$1 = new ji_PrintStream;
        otcic_StdoutOutputStream_$callClinit();
        ji_PrintStream__init_0(var$1, otcic_StdoutOutputStream_INSTANCE, 0);
        jl_System_outCache = var$1;
    }
    return jl_System_outCache;
}
function jl_System_err() {
    var var$1;
    if (jl_System_errCache === null) {
        var$1 = new ji_PrintStream;
        otcic_StderrOutputStream_$callClinit();
        ji_PrintStream__init_0(var$1, otcic_StderrOutputStream_INSTANCE, 0);
        jl_System_errCache = var$1;
    }
    return jl_System_errCache;
}
function jl_System_arraycopy($src, $srcPos, $dest, $destPos, $length) {
    var var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
            var$6 = $destPos + $length | 0;
            if (var$6 <= jlr_Array_getLength($dest)) {
                a: {
                    b: {
                        if ($src !== $dest) {
                            $srcType = (jl_Object_getClass($src)).$getComponentType();
                            $targetType = (jl_Object_getClass($dest)).$getComponentType();
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!$srcType.$isPrimitive0() && !$targetType.$isPrimitive0()) {
                                    $srcArray = $src;
                                    $i = 0;
                                    var$6 = $srcPos;
                                    while ($i < $length) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$6 + 1 | 0;
                                        $elem = var$11[var$6];
                                        if (!$targetType.$isInstance($elem)) {
                                            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                            $rt_throw(jl_ArrayStoreException__init_());
                                        }
                                        $i = $i + 1 | 0;
                                        var$6 = var$12;
                                    }
                                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                    return;
                                }
                                if (!$srcType.$isPrimitive0())
                                    break a;
                                if ($targetType.$isPrimitive0())
                                    break b;
                                else
                                    break a;
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
                $rt_throw(jl_ArrayStoreException__init_());
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    $rt_throw(jl_NullPointerException__init_0($rt_s(58)));
}
function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
    if (var$1 !== var$3 || var$4 < var$2) {
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[var$4++] = var$1.data[var$2++];
        }
    } else {
        var$2 = (var$2 + var$5) | 0;
        var$4 = (var$4 + var$5) | 0;
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[--var$4] = var$1.data[--var$2];
        }
    }
}
function jl_System_currentTimeMillis() {
    return Long_fromNumber(new Date().getTime());
}
function jl_System_gc() {}
function jl_System_nanoTime() {
    return Long_fromNumber($rt_globals.performance.now() * 1000000.0);
}
var g_Greenfoot = $rt_classWithoutFields();
var g_Greenfoot_randomGenerator = null;
function g_Greenfoot_$callClinit() {
    g_Greenfoot_$callClinit = $rt_eraseClinit(g_Greenfoot);
    g_Greenfoot__clinit_();
}
function g_Greenfoot__init_0() {
    var var_0 = new g_Greenfoot();
    g_Greenfoot__init_(var_0);
    return var_0;
}
function g_Greenfoot__init_($this) {
    g_Greenfoot_$callClinit();
    jl_Object__init_0($this);
}
function g_Greenfoot_setWorld($world) {
    g_Greenfoot_$callClinit();
    if ($world !== null) {
        (gc_WorldHandler_getInstance()).$setWorld($world);
        return;
    }
    $rt_throw(jl_NullPointerException__init_0($rt_s(59)));
}
function g_Greenfoot_isKeyDown($keyName) {
    g_Greenfoot_$callClinit();
    return ((gc_WorldHandler_getInstance()).$getKeyboardManager()).$isKeyDown($keyName);
}
function g_Greenfoot__clinit_() {
    g_Greenfoot_randomGenerator = ju_Random__init_();
}
var gc_InRangeQuery = $rt_classWithoutFields();
function gc_InRangeQuery__init_() {
    var var_0 = new gc_InRangeQuery();
    gc_InRangeQuery__init_0(var_0);
    return var_0;
}
function gc_InRangeQuery__init_0($this) {
    jl_Object__init_0($this);
}
var gc_RepaintHandler = $rt_classWithoutFields(0);
function gc_WorldHandler$2() {
    jl_Object.call(this);
    this.$this$05 = null;
}
function gc_WorldHandler$2__init_(var_0) {
    var var_1 = new gc_WorldHandler$2();
    gc_WorldHandler$2__init_0(var_1, var_0);
    return var_1;
}
function gc_WorldHandler$2__init_0($this, $this$0) {
    $this.$this$05 = $this$0;
    jl_Object__init_0($this);
}
function gc_WorldHandler$2_doRepaint($this) {
    gc_WorldHandler_access$000($this.$this$05);
    gc_WorldHandler_access$102($this.$this$05, 0);
}
function gc_WorldHandler$2_doRepaint$exported$0(var$0) {
    var$0.$doRepaint();
}
function ju_LinkedList$Entry() {
    var a = this; jl_Object.call(a);
    a.$item = null;
    a.$next5 = null;
    a.$previous = null;
}
function ju_LinkedList$Entry__init_0() {
    var var_0 = new ju_LinkedList$Entry();
    ju_LinkedList$Entry__init_(var_0);
    return var_0;
}
function ju_LinkedList$Entry__init_($this) {
    jl_Object__init_0($this);
}
var jl_Character = $rt_classWithoutFields();
var jl_Character_TYPE = null;
var jl_Character_digitMapping = null;
var jl_Character_lowerCaseMapping = null;
var jl_Character_classMapping = null;
var jl_Character_characterCache = null;
var jl_Character_$$metadata$$0 = null;
var jl_Character_$$metadata$$3 = null;
var jl_Character_$$metadata$$4 = null;
function jl_Character_$callClinit() {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
}
function jl_Character_isBmpCodePoint($codePoint) {
    jl_Character_$callClinit();
    return $codePoint > 0 && $codePoint <= 65535 ? 1 : 0;
}
function jl_Character_isHighSurrogate($ch) {
    jl_Character_$callClinit();
    return ($ch & 64512) != 55296 ? 0 : 1;
}
function jl_Character_isLowSurrogate($ch) {
    jl_Character_$callClinit();
    return ($ch & 64512) != 56320 ? 0 : 1;
}
function jl_Character_isSurrogate($ch) {
    jl_Character_$callClinit();
    return !jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1;
}
function jl_Character_toCodePoint($high, $low) {
    jl_Character_$callClinit();
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
}
function jl_Character_highSurrogate($codePoint) {
    var var$2;
    jl_Character_$callClinit();
    var$2 = $codePoint - 65536 | 0;
    return (55296 | var$2 >> 10 & 1023) & 65535;
}
function jl_Character_lowSurrogate($codePoint) {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
}
function jl_Character_toLowerCase($ch) {
    jl_Character_$callClinit();
    return jl_Character_toLowerCase0($ch) & 65535;
}
function jl_Character_toLowerCase0($ch) {
    jl_Character_$callClinit();
    return jl_Character_mapChar(jl_Character_getLowerCaseMapping(), $ch);
}
function jl_Character_getLowerCaseMapping() {
    jl_Character_$callClinit();
    if (jl_Character_lowerCaseMapping === null)
        jl_Character_lowerCaseMapping = otciu_UnicodeHelper_decodeCaseMapping(((jl_Character_acquireLowerCaseMapping()).value !== null ? $rt_str((jl_Character_acquireLowerCaseMapping()).value) : null));
    return jl_Character_lowerCaseMapping;
}
function jl_Character_acquireLowerCaseMapping() {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$0 === null)
        jl_Character_$$metadata$$0 = jl_Character_acquireLowerCaseMapping$$create();
    return jl_Character_$$metadata$$0;
}
function jl_Character_mapChar($table, $codePoint) {
    var $index, var$4;
    jl_Character_$callClinit();
    $index = jl_Character_binarySearchTable($table, $codePoint);
    if ($index >= 0) {
        var$4 = $table.data;
        if ($index < (var$4.length / 2 | 0))
            return $codePoint + var$4[($index * 2 | 0) + 1 | 0] | 0;
    }
    return 0;
}
function jl_Character_binarySearchTable($data, $key) {
    var var$3, $l, $u, $i, $e, var$8;
    jl_Character_$callClinit();
    var$3 = $data.data;
    $l = 0;
    $u = (var$3.length / 2 | 0) - 1 | 0;
    while (true) {
        $i = ($l + $u | 0) / 2 | 0;
        $e = var$3[$i * 2 | 0];
        var$8 = $rt_compare($e, $key);
        if (!var$8)
            break;
        if (var$8 <= 0) {
            $l = $i + 1 | 0;
            if ($l > $u)
                return $i;
        } else {
            $u = $i - 1 | 0;
            if ($u < $l)
                return $u;
        }
    }
    return $i;
}
function jl_Character_digit($ch, $radix) {
    jl_Character_$callClinit();
    return jl_Character_digit0($ch, $radix);
}
function jl_Character_digit0($codePoint, $radix) {
    var $d;
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36) {
        $d = jl_Character_getNumericValue0($codePoint);
        if ($d >= $radix)
            $d = (-1);
        return $d;
    }
    return (-1);
}
function jl_Character_getNumericValue($ch) {
    jl_Character_$callClinit();
    return jl_Character_getNumericValue0($ch);
}
function jl_Character_getNumericValue0($codePoint) {
    var $digitMapping, var$3, $l, $u, $idx, var$7, $val, var$9;
    jl_Character_$callClinit();
    $digitMapping = jl_Character_getDigitMapping();
    var$3 = $digitMapping.data;
    $l = 0;
    $u = (var$3.length / 2 | 0) - 1 | 0;
    while ($u >= $l) {
        $idx = ($l + $u | 0) / 2 | 0;
        var$7 = $idx * 2 | 0;
        $val = var$3[var$7];
        var$9 = $rt_compare($codePoint, $val);
        if (var$9 > 0)
            $l = $idx + 1 | 0;
        else {
            if (var$9 >= 0)
                return var$3[var$7 + 1 | 0];
            $u = $idx - 1 | 0;
        }
    }
    return (-1);
}
function jl_Character_forDigit($digit, $radix) {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character_getDigitMapping() {
    jl_Character_$callClinit();
    if (jl_Character_digitMapping === null)
        jl_Character_digitMapping = otciu_UnicodeHelper_decodeIntPairsDiff(((jl_Character_obtainDigitMapping()).value !== null ? $rt_str((jl_Character_obtainDigitMapping()).value) : null));
    return jl_Character_digitMapping;
}
function jl_Character_obtainDigitMapping() {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$3 === null)
        jl_Character_$$metadata$$3 = jl_Character_obtainDigitMapping$$create();
    return jl_Character_$$metadata$$3;
}
function jl_Character_getClasses() {
    jl_Character_$callClinit();
    if (jl_Character_classMapping === null)
        jl_Character_classMapping = otciu_UnicodeHelper_extractRle(((jl_Character_obtainClasses()).value !== null ? $rt_str((jl_Character_obtainClasses()).value) : null));
    return jl_Character_classMapping;
}
function jl_Character_obtainClasses() {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$4 === null)
        jl_Character_$$metadata$$4 = jl_Character_obtainClasses$$create();
    return jl_Character_$$metadata$$4;
}
function jl_Character_getType($codePoint) {
    var $classes, var$3, $l, $u, $i, $range;
    jl_Character_$callClinit();
    if (jl_Character_isBmpCodePoint($codePoint) && jl_Character_isSurrogate($codePoint & 65535))
        return 19;
    $classes = jl_Character_getClasses();
    var$3 = $classes.data;
    $l = 0;
    $u = var$3.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = var$3[$i];
        if ($codePoint >= $range.$end)
            $l = $i + 1 | 0;
        else {
            if ($codePoint >= $range.$start1)
                return $range.$data0.data[$codePoint - $range.$start1 | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
}
function jl_Character_isSpaceChar($codePoint) {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 12:
        case 13:
        case 14:
            break;
        default:
            return 0;
    }
    return 1;
}
function jl_Character_isWhitespace($ch) {
    jl_Character_$callClinit();
    return jl_Character_isWhitespace0($ch);
}
function jl_Character_isWhitespace0($codePoint) {
    jl_Character_$callClinit();
    switch ($codePoint) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 28:
        case 29:
        case 30:
        case 31:
            break;
        case 160:
        case 8199:
        case 8239:
            return 0;
        default:
            return jl_Character_isSpaceChar($codePoint);
    }
    return 1;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function jl_Character_acquireLowerCaseMapping$$create() {
    return {"value" : ">W  H#F#U 4%F#O #F#/ d%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a1# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #<+#%# #%# #%# \'.3#%# #%# #{1#%# #w1%%# %J\'#k1#o1#%# #w1#!3# #23#*3#%# \'23#:3# #>3#%# #%# #%# #N3#%# #N3# %%# #N3#%# #J3%%# #%# #R3#%# \'%# /)#%# #)#%# #)#%# #%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# %)#%# #%# #8)#L%#%# #%# #%# #"
    + "%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a+# #%# #%# #%# #%# #%# #%# #%# #%# #%# /B45#%# #,/#645# %%# #P1#!\'#*\'#%# #%# #%# #%# #%# <-%# #%# \'%# 1&++ %_## #Z#)k%%g%% #F#W hA# 1%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# +]%# %%# #?#%# %a+\'N\'AF#b &#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #^#%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# %*%r iB#oq-&# _?gejg#A1 o$#mo%&# {-%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3,4/# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3C1 1C1 1C1 1C1 1C1 3C/ 1C1 QC1 1C1 1C1 1C%8\'%G# 7i\')G# 7C%D)\' 7C%u)%?# 7X+%P+%G# L-q*/# \'Pw/#8m/# -6## |bA G%# kC.#U !r*%&# &#%# #,05#qX\'#H.5# %%# #%# #%# #e25#D05#q25#m25# #%# %%# 1865%%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# "
    + "#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 1%# #%# )%# (a=%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# G%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# y%%# #%# #%# #%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 5%# #%# #4Fd#%# #%# #%# #%# #%# )%# #<{p# %%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #P}p#}}p#m}p#D}p#P}p# #@yp#D{p#Lyp#Br#%# #%# #%# #%"
    + "# #%# #%# #%# #%# #,%#L}p#LJd#%# #%# -%# +%# #%# Y%# ,T5F#U TUg#r {%g#r >\'c#p Lnk%F# *J#F#b o@5F#b Jo=N#f "};
}
function jl_Character_obtainDigitMapping$$create() {
    return {"value" : "&C*% %%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%_H#T#%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%{CG%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%6)G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%!i#G"
    + "%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%*;G%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%:/G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%{/G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%R@dG%%%%%%%%%%%%%%%%%%R[G%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%!#G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%cCG%%%%%%%%%%%%%%%%%%o*IG%%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%c:#T#%%%%%%%%%%%%%%%%%%w&%G%%%%%"
    + "%%%%%%%%%%%%%BhG%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%_%G%%%%%%%%%%%%%%%%%%>-G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%w=G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%>AG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%!dG%%%%%%%%%%%%%%%%%%g5G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%*0EG%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%28UG%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%"
    + "%%%!8%G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%sKG%%%%%%%%%%%%%%%%%%>&#G%%%%%%%%%%%%%%%%%%wN)G%%%%%%%%%%%%%%%%%%"};
}
function jl_Character_obtainClasses$$create() {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!Cg&C<E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!#"
    + "!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BGA#%Y\'CJ95A#^#; GN5\'9G#9G#9\'A)F<A%F%Y#A,Q\'Z$Y#;Y#^#G,91Y$FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A#\'[#F7G%%G*%G$%G&A#Y0 F:G$A#9 F,A&F9<F\' Q#A\'G)FJ%G91GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I# F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9\'A#G#) F\'A%F#A#F7 F( F# F#"
    + " F#A#\' I$G#A%G#A#G$A$\'A(F% &A(J+G#F$\'9A+G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A(G#)A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$\'F) F$ F8 F1A#\'&G$I% G$ G%A(G# F$A#&A#F#G#A#J+A(9L(=&\'I#9F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A\'F# F#G#A#J+ F#)A-G#I#F* F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\' \'I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# & F& F9 & F+\'F#G*&A#F& % G( J+A#F%AA&^$Y0=9^$G#^\'J+"
    + "L+=\'=\'=\'6767I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#CL9%C$b&*&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* =9F2-F;67A$FmY$K$F)A(F3G$)A*F4G#)Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1\'J+A\'FD%FVA(F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(G1ARG%)FP\')G&)\'I&\'I#F)A$J+Y(^+G*^*Y# G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)Y%"
    + "FEI)G)I#G#A$Y&J+A$F$J+F?E\'Y#C*A(BLA#B$Y)A)G$9G.)G(F%\'F\'\'F#)G#&A&CMEaC.%CCEFGb!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67 E.A$[BA0G."
    + "H%\'H$G-A0^#!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^gA:^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#^A b=J! BQCQ!#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?Y#>?67676767Y"
    + "&%Y+U#Y%596Y.^#Y$676767675AC^; b=:! A-b=7$ A;^-A%-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FL b&?!  ^#L%^+FA^EA-F1^@ L+^?L)=L0^AL+^HL0b= & &b `G!&^b&b   %b `(!F7%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B&#B&#!#!#!#!#!#!#!#B%#!#A&!# # #!#!#A9E$!#&E##F(\'F"
    + "$\'F%\'F8I#G#)^%\'A$L\'^#;=A\'FUY%A)I#FSI1G#A)Y#J+A\'G3F\'Y$&9F#\'J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#G#I$Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C*%]#A%b#1! FDI#\'I#\'I#9)\'A#J+A\'&b CO#&A-F8A%FRA%4b `. T#b `! T#b `0 43b `D!3b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]2A1b&L& 76^1FbA#FWA(=AAF-;^$G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F\'A#F\'A#"
    + "F$A$[#:<=[# =Z%^#A+Q$^#A#F- F; F4 F# F0A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^.A$=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9B, B0 B( B# C, C0 C( C#Aeb&X% A*F7A+F)A9E\' EK E*AgF\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9AbFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F>A#G$A%\'L*A(Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'FEG%A)J+b G% L@ FK G#5A#F#AmG$F>L+&A)F7G,L%Y&A7F3G%Y%AGF6L(A5F8A*)\')FVG0Y(A%L5J+\'F#G#&A*G$)FNI$G%I#G#Y#1Y%\'A+1A#F:A(J+"
    + "A\'G$FEG&)G) J+Y%&I#&A)FD\'Y#&A*G#)FQI$G*I#F%Y%G%9)\'J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'F#\'A`F( & F% F0 F+9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A#F7 F( F# F& G#&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&b ,# FVI$G)I#G$)\'F%Y&J+Y# 9\'F$A?FQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'&9A\'J+AWF<A#G$I#G%)G&A%J+L#Y$=F(b Z# FMI$G*)G#9b E! BACAJ+L*A-F)A#&A#F) F# F9I\' I#A#G#)\'&)&)\'Y$A*J+AhF)A#FHI$G%A#G#I%\'&9&)A<&G+FIG\')&G%Y)\'A)&G\'I#G$FOG.)G#Y$&Y&A.FkA(Y+b W$ F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF("
    + " F# FGG\'A$\' G# G(&\'A)J+A\'F\' F# FAI& G# I#\')\'&A(J+b W% F4G#I#Y#A(G#&)F. FCI#G&A$I#\')\'Y.J+b 7! &A0L6^)[%^2A.9b&;/ b G! b+P!  Y&A,b&%$ b -J b&B! Y#A.b&Q1 Q1\'F\'G0b K` b&(* b Z\'#b&Z) A(F@ J+A%Y#Fq J+A\'F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q+ BACAL8Y%b F! FmA%\'&IXA(G%E.AbE#9%\'A,I#A/&b W@!&A)b&74 AK&A(&b H,#E% E( E# b&D% A0&A>F$A#&A/F%A)b&-\' b %E b&L! A&F.A$F*A(F+A#=G#9Q%b =*!GOA#G8A*b=U! A^b=W$ A+^HA#^^I#G$^$I\'Q)G)^#G(^?G%^_A6^dG$=b [! L5A-L5A-b=8! A*L:b (# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) "
    + "B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C=A#B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 12 C+&C5A\'C\'b 6$ G( G2A#G( G# G&A&E`AB\'b Q! FNA$G(E(A#J+A%&=b  & F?\'A2FMG%J+A&;b 1( F<%G%J+b G, F( F% F# F0 b&&$ A#L*G(AJBCCCG(%A%J+A%Y#b 2- L]=L$;L%AnLN=L0b #$ F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.b=B# AY^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=9, A%^2A$^.A$b=X! A%b=@! A\'^-A%=A0^-A%^YA)^+A\'^IA)^?A#^#Apb=5& A"
    + "-^/A#^.A$^*A(^O ^(A)^/A%^*A(^*A(b=4#  ^XAFJ+b \'1 &b   %b   %b ?<#&AA&b Y !&A\'&b =$ &A#&b  ;!&A/&b PU!&b @Q b&?) b C8 &b *.!&A&&b ?!!&b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b 2R!1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$3b   %b   %b   %b ^a$3A#3b   %b   %b   %b ^a$3"};
}
function jl_Object$monitorExit$lambda$_8_0() {
    jl_Object.call(this);
    this.$_011 = null;
}
function jl_Object$monitorExit$lambda$_8_0__init_(var_0) {
    var var_1 = new jl_Object$monitorExit$lambda$_8_0();
    jl_Object$monitorExit$lambda$_8_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Object$monitorExit$lambda$_8_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_011 = var$1;
}
function jl_Object$monitorExit$lambda$_8_0_run(var$0) {
    jl_Object_lambda$monitorExit$2(var$0.$_011);
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_012 = null;
    a.$_15 = null;
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0__init_(var_0, var_1) {
    var var_2 = new g_GreenfootImage$2$handleEvent$lambda$_1_0();
    g_GreenfootImage$2$handleEvent$lambda$_1_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_012 = var$1;
    var$0.$_15 = var$2;
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0_run(var$0) {
    g_GreenfootImage$2_lambda$handleEvent$0(var$0.$_012, var$0.$_15);
}
var ggim_PriorityManager = $rt_classWithoutFields();
function ggim_PriorityManager__init_0() {
    var var_0 = new ggim_PriorityManager();
    ggim_PriorityManager__init_(var_0);
    return var_0;
}
function ggim_PriorityManager__init_($this) {
    jl_Object__init_0($this);
}
function ggim_PriorityManager_isHigherPriority($newEvent, $currentData) {
    var $currentPriority, $newPriority;
    $currentPriority = ggim_PriorityManager_getPriority($currentData);
    $newPriority = ggim_PriorityManager_getPriority0($newEvent);
    return $newPriority > $currentPriority ? 0 : 1;
}
function ggim_PriorityManager_getPriority0($event) {
    var var$2;
    a: {
        var$2 = (-1);
        switch ($event.$hashCode0()) {
            case -1844879718:
                if (!$event.$equals($rt_s(55)))
                    break a;
                var$2 = 2;
                break a;
            case 94750088:
                if (!$event.$equals($rt_s(46)))
                    break a;
                var$2 = 1;
                break a;
            case 586843847:
                if (!$event.$equals($rt_s(47)))
                    break a;
                var$2 = 3;
                break a;
            case 586846041:
                if (!$event.$equals($rt_s(49)))
                    break a;
                var$2 = 4;
                break a;
            case 587111926:
                if (!$event.$equals($rt_s(50)))
                    break a;
                var$2 = 5;
                break a;
            case 1243067904:
                if (!$event.$equals($rt_s(48)))
                    break a;
                var$2 = 0;
                break a;
            default:
        }
    }
    switch (var$2) {
        case 0:
            break;
        case 1:
        case 2:
            return 1;
        case 3:
            return 2;
        case 4:
            return 3;
        case 5:
            return 4;
        default:
            return 2147483647;
    }
    return 0;
}
function ggim_PriorityManager_getPriority($data) {
    if ($data.$isMouseDragEnded(null))
        return 0;
    if ($data.$isMouseClicked(null))
        return 1;
    if ($data.$isMousePressed(null))
        return 2;
    if ($data.$isMouseDragged(null))
        return 3;
    if (!$data.$isMouseMoved(null))
        return 2147483647;
    return 4;
}
var jn_CharBuffer = $rt_classWithoutFields(jn_Buffer);
function jn_CharBuffer__init_($this, $capacity, $position, $limit) {
    jn_Buffer__init_($this, $capacity);
    $this.$position = $position;
    $this.$limit = $limit;
}
function jn_CharBuffer_wrap($array, $offset, $length) {
    return jn_CharBufferOverArray__init_(0, $array.data.length, $array, $offset, $offset + $length | 0, 0);
}
function jn_CharBuffer_get($this, $dst, $offset, $length) {
    var var$4, var$5, var$6, var$7, var$8, $pos, $i, var$11;
    if ($offset >= 0) {
        var$4 = $dst.data;
        var$5 = var$4.length;
        if ($offset < var$5) {
            var$6 = $offset + $length | 0;
            if (var$6 > var$5) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$8, $rt_s(60)), var$6), $rt_s(31)), var$5);
                jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            if (jn_Buffer_remaining($this) < $length)
                $rt_throw(jn_BufferUnderflowException__init_0());
            if ($length < 0) {
                var$8 = new jl_IndexOutOfBoundsException;
                var$7 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$7, $rt_s(32)), $length), $rt_s(33));
                jl_IndexOutOfBoundsException__init_2(var$8, jl_StringBuilder_toString(var$7));
                $rt_throw(var$8);
            }
            $pos = $this.$position;
            $i = 0;
            while ($i < $length) {
                var$6 = $offset + 1 | 0;
                var$5 = $pos + 1 | 0;
                var$4[$offset] = $this.$getChar($pos);
                $i = $i + 1 | 0;
                $offset = var$6;
                $pos = var$5;
            }
            $this.$position = $this.$position + $length | 0;
            return $this;
        }
    }
    var$4 = $dst.data;
    var$8 = new jl_IndexOutOfBoundsException;
    var$5 = var$4.length;
    var$11 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$11, $rt_s(34)), $offset), $rt_s(19)), var$5), 41);
    jl_IndexOutOfBoundsException__init_2(var$8, jl_StringBuilder_toString(var$11));
    $rt_throw(var$8);
}
function jn_CharBuffer_position($this, $newPosition) {
    jn_Buffer_position0($this, $newPosition);
    return $this;
}
var jn_CharBufferImpl = $rt_classWithoutFields(jn_CharBuffer);
function jn_CharBufferImpl__init_($this, $capacity, $position, $limit) {
    jn_CharBuffer__init_($this, $capacity, $position, $limit);
}
function jn_CharBufferOverArray() {
    var a = this; jn_CharBufferImpl.call(a);
    a.$readOnly0 = 0;
    a.$start2 = 0;
    a.$array0 = null;
}
function jn_CharBufferOverArray__init_(var_0, var_1, var_2, var_3, var_4, var_5) {
    var var_6 = new jn_CharBufferOverArray();
    jn_CharBufferOverArray__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
}
function jn_CharBufferOverArray__init_0($this, $start, $capacity, $array, $position, $limit, $readOnly) {
    jn_CharBufferImpl__init_($this, $capacity, $position, $limit);
    $this.$start2 = $start;
    $this.$readOnly0 = $readOnly;
    $this.$array0 = $array;
}
function jn_CharBufferOverArray_getChar($this, $index) {
    return $this.$array0.data[$index + $this.$start2 | 0];
}
var otcic_Console = $rt_classWithoutFields();
function otcic_Console__init_0() {
    var var_0 = new otcic_Console();
    otcic_Console__init_(var_0);
    return var_0;
}
function otcic_Console__init_($this) {
    jl_Object__init_0($this);
}
function otcic_Console_writeStderr($data, $off, $len) {
    var $i, $b;
    $i = 0;
    while ($i < $len) {
        $b = $data.data[$i + $off | 0];
        $rt_putStderr($b & 255);
        $i = $i + 1 | 0;
    }
}
function otcic_Console_writeStdout($data, $off, $len) {
    var $i, $b;
    $i = 0;
    while ($i < $len) {
        $b = $data.data[$i + $off | 0];
        $rt_putStdout($b & 255);
        $i = $i + 1 | 0;
    }
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0() {
    jl_Object.call(this);
    this.$_013 = null;
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_(var_0) {
    var var_1 = new jl_Thread$SleepHandler$interrupted$lambda$_1_0();
    jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_013 = var$1;
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0_run(var$0) {
    jl_Thread$SleepHandler_lambda$interrupted$1(var$0.$_013);
}
var g_ActorVisitor = $rt_classWithoutFields();
function g_ActorVisitor__init_0() {
    var var_0 = new g_ActorVisitor();
    g_ActorVisitor__init_(var_0);
    return var_0;
}
function g_ActorVisitor__init_($this) {
    jl_Object__init_0($this);
}
function g_ActorVisitor_initialise() {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor_initialise();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($ptr);
}
function g_ActorVisitor_getX($actor) {
    return $actor.$x;
}
function g_ActorVisitor_getY($actor) {
    return $actor.$y;
}
function g_ActorVisitor_getRotation($actor) {
    return $actor.$rotation;
}
function g_ActorVisitor_getWorld($actor) {
    return $actor.$world;
}
function g_ActorVisitor_intersects($actor, $other) {
    return $actor.$intersects1($other);
}
function g_ActorVisitor_getBoundingRect($actor) {
    return $actor.$getBoundingRect();
}
function g_ActorVisitor_setData($actor, $n) {
    $actor.$setData0($n);
}
function g_ActorVisitor_getData($actor) {
    return $actor.$getData0();
}
function g_ActorVisitor_getDisplayImage($actor) {
    return $actor.$getImage1();
}
function g_ActorVisitor_setDelegate($instance) {
    g_Actor_setDelegate($instance);
}
function g_ActorVisitor_getSequenceNumber($actor) {
    return g_Actor_getSequenceNumber($actor);
}
function g_ActorVisitor_getLastPaintSeqNum($actor) {
    return g_Actor_getLastPaintSeqNum($actor);
}
function g_ActorVisitor_setLastPaintSeqNum($actor, $num) {
    g_Actor_setLastPaintSeqNum($actor, $num);
}
function g_ActorVisitor_decrementSleepForIfPositive($actor) {
    var $s;
    $s = g_Actor_getSleepingFor($actor);
    if ($s > 0)
        g_Actor_setSleepingFor($actor, $s - 1 | 0);
    return $s ? 0 : 1;
}
var playermenu = $rt_classWithoutFields(g_Actor);
function playermenu__init_0() {
    var var_0 = new playermenu();
    playermenu__init_(var_0);
    return var_0;
}
function playermenu__init_($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function playermenu_act($this) {}
var otc_ResourceSource = $rt_classWithoutFields();
var otc_ResourceSource_resourceSource = null;
function otc_ResourceSource__init_($this) {
    jl_Object__init_0($this);
}
function otc_ResourceSource_setSource($source) {
    otc_ResourceSource_resourceSource = $source;
}
var ju_Dictionary = $rt_classWithoutFields();
function ju_Dictionary__init_($this) {
    jl_Object__init_0($this);
}
function ggim_MouseEventData() {
    var a = this; jl_Object.call(a);
    a.$mouseInfo = null;
    a.$mouseDragEndedInfo = null;
    a.$mouseClickedInfo = null;
    a.$mousePressedInfo = null;
    a.$mouseDraggedInfo = null;
    a.$mouseMovedInfo = null;
}
function ggim_MouseEventData__init_0() {
    var var_0 = new ggim_MouseEventData();
    ggim_MouseEventData__init_(var_0);
    return var_0;
}
function ggim_MouseEventData__init_($this) {
    jl_Object__init_0($this);
}
function ggim_MouseEventData_init($this) {
    var $blankedMouseInfo;
    $this.$mousePressedInfo = null;
    $this.$mouseClickedInfo = null;
    $this.$mouseDraggedInfo = null;
    $this.$mouseDragEndedInfo = null;
    $this.$mouseMovedInfo = null;
    if ($this.$mouseInfo !== null) {
        $blankedMouseInfo = g_MouseInfoVisitor_newMouseInfo();
        g_MouseInfoVisitor_setLoc($blankedMouseInfo, $this.$mouseInfo.$getX(), $this.$mouseInfo.$getY());
        $this.$mouseInfo = $blankedMouseInfo;
    }
}
function ggim_MouseEventData_isMousePressed($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mousePressedInfo);
}
function ggim_MouseEventData_mousePressed($this, $x, $y, $button, $actor) {
    $this.$init0();
    $this.$mousePressedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mousePressedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_isMouseClicked($this, $obj) {
    if ($obj !== null && $this.$isMousePressed(null) && !$this.$isMousePressed($obj))
        return 0;
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseClickedInfo);
}
function ggim_MouseEventData_mouseClicked($this, $x, $y, $button, $clickCount, $actor) {
    var $tempPressedInfo;
    $tempPressedInfo = $this.$mousePressedInfo;
    $this.$init0();
    $this.$mousePressedInfo = $tempPressedInfo;
    $this.$mouseClickedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseClickedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
    g_MouseInfoVisitor_setClickCount($this.$mouseInfo, $clickCount);
}
function ggim_MouseEventData_isMouseDragged($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseDraggedInfo);
}
function ggim_MouseEventData_mouseDragged($this, $x, $y, $button, $actor) {
    $this.$init0();
    $this.$mouseDraggedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseDraggedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_isMouseDragEnded($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseDragEndedInfo);
}
function ggim_MouseEventData_mouseDragEnded($this, $x, $y, $button, $actor) {
    var $tempPressedInfo, $tempClickedInfo;
    $tempPressedInfo = $this.$mousePressedInfo;
    $tempClickedInfo = $this.$mouseClickedInfo;
    $this.$init0();
    $this.$mousePressedInfo = $tempPressedInfo;
    $this.$mouseClickedInfo = $tempClickedInfo;
    $this.$mouseDragEndedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseDragEndedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_mouseExited($this) {
    $this.$mouseInfo = $this.$mouseDraggedInfo;
    $this.$mouseMovedInfo = null;
}
function ggim_MouseEventData_isMouseMoved($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseMovedInfo);
}
function ggim_MouseEventData_mouseMoved($this, $x, $y, $button, $actor) {
    $this.$init0();
    $this.$mouseMovedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseMovedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_getActor($this) {
    if ($this.$mouseInfo === null)
        return null;
    return $this.$mouseInfo.$getActor();
}
function ggim_MouseEventData_getButton($this) {
    if ($this.$mouseInfo === null)
        return 0;
    return $this.$mouseInfo.$getButton();
}
function ggim_MouseEventData_checkObject($this, $obj, $info) {
    var $actor;
    if ($info === null)
        return 0;
    $actor = $info.$getActor();
    return $obj !== null && !($obj instanceof g_World && $actor === null) && $actor !== $obj ? 0 : 1;
}
function ju_HashMap$1() {
    ju_AbstractSet.call(this);
    this.$this$06 = null;
}
function ju_HashMap$1__init_(var_0) {
    var var_1 = new ju_HashMap$1();
    ju_HashMap$1__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$1__init_0($this, $this$0) {
    $this.$this$06 = $this$0;
    ju_AbstractSet__init_($this);
}
function ju_HashMap$1_iterator($this) {
    return ju_HashMap$KeyIterator__init_($this.$this$06);
}
var jl_Double = $rt_classWithoutFields(jl_Number);
var jl_Double_NaN = 0.0;
var jl_Double_TYPE = null;
function jl_Double_$callClinit() {
    jl_Double_$callClinit = $rt_eraseClinit(jl_Double);
    jl_Double__clinit_();
}
function jl_Double__clinit_() {
    jl_Double_NaN = $rt_globals.NaN;
    jl_Double_TYPE = $rt_cls($rt_doublecls());
}
function g_ActorSet$ListNode() {
    var a = this; jl_Object.call(a);
    a.$actor0 = null;
    a.$next3 = null;
    a.$prev0 = null;
    a.$nextHash = null;
    a.$prevHash = null;
    a.$this$07 = null;
}
function g_ActorSet$ListNode__init_(var_0) {
    var var_1 = new g_ActorSet$ListNode();
    g_ActorSet$ListNode__init_0(var_1, var_0);
    return var_1;
}
function g_ActorSet$ListNode__init_1(var_0, var_1, var_2) {
    var var_3 = new g_ActorSet$ListNode();
    g_ActorSet$ListNode__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_ActorSet$ListNode__init_0($this, var$1) {
    $this.$this$07 = var$1;
    jl_Object__init_0($this);
    $this.$next3 = $this;
    $this.$prev0 = $this;
}
function g_ActorSet$ListNode__init_2($this, var$1, $actor, $listTail) {
    $this.$this$07 = var$1;
    jl_Object__init_0($this);
    $this.$actor0 = $actor;
    $this.$next3 = $listTail.$next3;
    $this.$prev0 = $listTail;
    $listTail.$next3 = $this;
    $this.$next3.$prev0 = $this;
}
function g_ActorSet$ListNode_setHashListHead($this, $oldHead) {
    if ($oldHead === null) {
        $this.$nextHash = $this;
        $this.$prevHash = $this;
    } else {
        $this.$nextHash = $oldHead;
        $this.$prevHash = $oldHead.$prevHash;
        $oldHead.$prevHash = $this;
        $this.$prevHash.$nextHash = $this;
    }
}
function g_ActorSet$ListNode_remove($this) {
    $this.$next3.$prev0 = $this.$prev0;
    $this.$prev0.$next3 = $this.$next3;
    $this.$nextHash.$prevHash = $this.$prevHash;
    $this.$prevHash.$nextHash = $this.$nextHash;
}
var otjde_FocusEventTarget = $rt_classWithoutFields(0);
var otjde_MouseEventTarget = $rt_classWithoutFields(0);
function otjde_MouseEventTarget_listenClick$static($this, $listener) {
    $this.addEventListener("click", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectClick$static($this, $listener) {
    $this.removeEventListener("click", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenDoubleClick$static($this, $listener) {
    $this.addEventListener("dblclick", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectDoubleClick$static($this, $listener) {
    $this.removeEventListener("dblclick", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseDown$static($this, $listener) {
    $this.addEventListener("mousedown", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseDown$static($this, $listener) {
    $this.removeEventListener("mousedown", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseUp$static($this, $listener) {
    $this.addEventListener("mouseup", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseUp$static($this, $listener) {
    $this.removeEventListener("mouseup", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseEnter$static($this, $listener) {
    $this.addEventListener("mouseenter", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseEnter$static($this, $listener) {
    $this.removeEventListener("mouseenter", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseLeave$static($this, $listener) {
    $this.addEventListener("mouseleave", otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseLeave$static($this, $listener) {
    $this.removeEventListener("mouseleave", otji_JS_function($listener, "handleEvent"));
}
var otjde_KeyboardEventTarget = $rt_classWithoutFields(0);
function otjde_KeyboardEventTarget_listenKeyDown$static($this, $listener) {
    $this.addEventListener("keydown", otji_JS_function($listener, "handleEvent"));
}
function otjde_KeyboardEventTarget_listenKeyUp$static($this, $listener) {
    $this.addEventListener("keyup", otji_JS_function($listener, "handleEvent"));
}
function otjde_KeyboardEventTarget_listenKeyPress$static($this, $listener) {
    $this.addEventListener("keypress", otji_JS_function($listener, "handleEvent"));
}
var otjb_WindowEventTarget = $rt_classWithoutFields(0);
function ge_SimulationEvent() {
    jl_Object.call(this);
    this.$type = 0;
}
function ge_SimulationEvent__init_(var_0, var_1) {
    var var_2 = new ge_SimulationEvent();
    ge_SimulationEvent__init_0(var_2, var_0, var_1);
    return var_2;
}
function ge_SimulationEvent__init_0($this, $source, $type) {
    jl_Object__init_0($this);
    $this.$type = $type;
}
function ge_SimulationEvent_getType($this) {
    return $this.$type;
}
var ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    var a = this; ju_AbstractList.call(a);
    a.$array1 = null;
    a.$size2 = 0;
}
function ju_ArrayList__init_() {
    var var_0 = new ju_ArrayList();
    ju_ArrayList__init_1(var_0);
    return var_0;
}
function ju_ArrayList__init_0(var_0) {
    var var_1 = new ju_ArrayList();
    ju_ArrayList__init_2(var_1, var_0);
    return var_1;
}
function ju_ArrayList__init_1($this) {
    ju_ArrayList__init_2($this, 10);
}
function ju_ArrayList__init_2($this, $initialCapacity) {
    ju_AbstractList__init_($this);
    $this.$array1 = $rt_createArray(jl_Object, $initialCapacity);
}
function ju_ArrayList_ensureCapacity($this, $minCapacity) {
    var $newLength;
    if ($this.$array1.data.length < $minCapacity) {
        $newLength = $this.$array1.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array1.data.length * 2 | 0, 5));
        $this.$array1 = ju_Arrays_copyOf1($this.$array1, $newLength);
    }
}
function ju_ArrayList_get($this, $index) {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array1.data[$index];
}
function ju_ArrayList_size($this) {
    return $this.$size2;
}
function ju_ArrayList_add($this, $element) {
    var var$2, var$3;
    $this.$ensureCapacity($this.$size2 + 1 | 0);
    var$2 = $this.$array1.data;
    var$3 = $this.$size2;
    $this.$size2 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return 1;
}
function ju_ArrayList_remove($this, $i) {
    var $old, var$3, var$4, $i_0;
    ju_ArrayList_checkIndex($this, $i);
    $old = $this.$array1.data[$i];
    $this.$size2 = $this.$size2 - 1 | 0;
    while ($i < $this.$size2) {
        var$3 = $this.$array1.data;
        var$4 = $this.$array1.data;
        $i_0 = $i + 1 | 0;
        var$3[$i] = var$4[$i_0];
        $i = $i_0;
    }
    $this.$array1.data[$this.$size2] = null;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return $old;
}
function ju_ArrayList_checkIndex($this, $index) {
    if ($index >= 0 && $index < $this.$size2)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
}
var otjb_StorageProvider = $rt_classWithoutFields(0);
var otjc_JSArrayReader = $rt_classWithoutFields(0);
var otjb_Window = $rt_classWithoutFields();
function otjb_Window_addEventListener$exported$0(var$0, var$1, var$2) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_removeEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_get$exported$2(var$0, var$1) {
    return var$0.$get2(var$1);
}
function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function otjb_Window_getLength$exported$5(var$0) {
    return var$0.$getLength0();
}
function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
var jl_IllegalMonitorStateException = $rt_classWithoutFields(jl_RuntimeException);
function jl_IllegalMonitorStateException__init_() {
    var var_0 = new jl_IllegalMonitorStateException();
    jl_IllegalMonitorStateException__init_0(var_0);
    return var_0;
}
function jl_IllegalMonitorStateException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function ju_LinkedList$SequentialListIterator() {
    var a = this; jl_Object.call(a);
    a.$nextEntry = null;
    a.$prevEntry0 = null;
    a.$currentEntry0 = null;
    a.$index0 = 0;
    a.$version = 0;
    a.$this$08 = null;
}
function ju_LinkedList$SequentialListIterator__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new ju_LinkedList$SequentialListIterator();
    ju_LinkedList$SequentialListIterator__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function ju_LinkedList$SequentialListIterator__init_0($this, var$1, $nextEntry, $prevEntry, $index) {
    $this.$this$08 = var$1;
    jl_Object__init_0($this);
    $this.$version = $this.$this$08.$modCount0;
    $this.$nextEntry = $nextEntry;
    $this.$prevEntry0 = $prevEntry;
    $this.$index0 = $index;
}
function ju_LinkedList$SequentialListIterator_hasNext($this) {
    return $this.$nextEntry === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_next($this) {
    var $result;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    if ($this.$nextEntry === null)
        $rt_throw(ju_NoSuchElementException__init_());
    $result = $this.$nextEntry.$item;
    $this.$currentEntry0 = $this.$nextEntry;
    $this.$prevEntry0 = $this.$nextEntry;
    $this.$nextEntry = $this.$nextEntry.$next5;
    $this.$index0 = $this.$index0 + 1 | 0;
    return $result;
}
function ju_LinkedList$SequentialListIterator_remove($this) {
    if ($this.$currentEntry0 === null)
        $rt_throw(jl_IllegalStateException__init_0());
    ju_LinkedList_removeEntry($this.$this$08, $this.$currentEntry0);
    if ($this.$currentEntry0 === $this.$prevEntry0) {
        $this.$prevEntry0 = !$this.$hasNext() ? null : $this.$nextEntry.$previous;
        $this.$index0 = $this.$index0 - 1 | 0;
    } else if ($this.$currentEntry0 === $this.$nextEntry)
        $this.$nextEntry = !$this.$hasPrevious() ? null : $this.$prevEntry0.$next5;
    $this.$version = $this.$this$08.$modCount0;
    $this.$currentEntry0 = null;
}
function ju_LinkedList$SequentialListIterator_hasPrevious($this) {
    return $this.$prevEntry0 === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_add($this, $e) {
    var $newEntry, var$3;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    $newEntry = ju_LinkedList$Entry__init_0();
    $newEntry.$item = $e;
    $newEntry.$previous = $this.$prevEntry0;
    $newEntry.$next5 = $this.$nextEntry;
    if ($this.$prevEntry0 === null)
        $this.$this$08.$firstEntry = $newEntry;
    else
        $this.$prevEntry0.$next5 = $newEntry;
    if ($this.$nextEntry === null)
        $this.$this$08.$lastEntry = $newEntry;
    else
        $this.$nextEntry.$previous = $newEntry;
    $this.$prevEntry0 = $newEntry;
    var$3 = $this.$this$08;
    var$3.$size1 = var$3.$size1 + 1 | 0;
    var$3 = $this.$this$08;
    var$3.$modCount0 = var$3.$modCount0 + 1 | 0;
    $this.$version = $this.$this$08.$modCount0;
    $this.$currentEntry0 = null;
}
function ju_LinkedList$SequentialListIterator_checkConcurrentModification($this) {
    if ($this.$version >= $this.$this$08.$modCount0)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function gj_KeyboardManager() {
    var a = this; jl_Object.call(a);
    a.$lastKeyTyped = null;
    a.$numKeys = 0;
    a.$keyLatched = null;
    a.$keyDown = null;
    a.$preventDefault = null;
    a.$maxNamedKey = 0;
    a.$keyNames = null;
    a.$jsKeyMap = null;
    a.$keyCodeMap = null;
    a.$gfKeyMap = null;
}
function gj_KeyboardManager__init_0() {
    var var_0 = new gj_KeyboardManager();
    gj_KeyboardManager__init_(var_0);
    return var_0;
}
function gj_KeyboardManager__init_($this) {
    jl_Object__init_0($this);
    $this.$numKeys = 100;
    $this.$keyLatched = $rt_createBooleanArray($this.$numKeys);
    $this.$keyDown = $rt_createBooleanArray($this.$numKeys);
    $this.$preventDefault = $rt_createBooleanArray($this.$numKeys);
    $this.$maxNamedKey = 0;
    $this.$jsKeyMap = ju_HashMap__init_();
    $this.$keyCodeMap = ju_HashMap__init_();
    $this.$gfKeyMap = ju_HashMap__init_();
    gj_KeyboardManager_addAllKeys($this);
    gj_KeyboardManager_buildKeyNameArray($this);
}
function gj_KeyboardManager_addAllKeys($this) {
    gj_KeyboardManager_addKey($this, $rt_s(61), 37, $rt_s(62), 1);
    gj_KeyboardManager_addKey($this, $rt_s(63), 38, $rt_s(64), 1);
    gj_KeyboardManager_addKey($this, $rt_s(65), 39, $rt_s(66), 1);
    gj_KeyboardManager_addKey($this, $rt_s(67), 40, $rt_s(68), 1);
    gj_KeyboardManager_addKey($this, $rt_s(69), 32, $rt_s(28), 1);
    gj_KeyboardManager_addKey($this, $rt_s(70), 13, $rt_s(29), 1);
    gj_KeyboardManager_addKey($this, $rt_s(71), 27, $rt_s(72), 1);
    gj_KeyboardManager_addKey($this, $rt_s(73), 112, $rt_s(74), 0);
    gj_KeyboardManager_addKey($this, $rt_s(75), 113, $rt_s(76), 0);
    gj_KeyboardManager_addKey($this, $rt_s(77), 114, $rt_s(78), 0);
    gj_KeyboardManager_addKey($this, $rt_s(79), 115, $rt_s(80), 0);
    gj_KeyboardManager_addKey($this, $rt_s(81), 116, $rt_s(82), 0);
    gj_KeyboardManager_addKey($this, $rt_s(83), 117, $rt_s(84), 0);
    gj_KeyboardManager_addKey($this, $rt_s(85), 118, $rt_s(86), 0);
    gj_KeyboardManager_addKey($this, $rt_s(87), 119, $rt_s(88), 0);
    gj_KeyboardManager_addKey($this, $rt_s(89), 120, $rt_s(90), 0);
    gj_KeyboardManager_addKey($this, $rt_s(91), 121, $rt_s(92), 0);
    gj_KeyboardManager_addKey($this, $rt_s(93), 122, $rt_s(94), 0);
    gj_KeyboardManager_addKey($this, $rt_s(95), 123, $rt_s(96), 0);
    gj_KeyboardManager_addKey($this, $rt_s(97), 8, $rt_s(98), 0);
    gj_KeyboardManager_addKey($this, $rt_s(99), 16, $rt_s(100), 0);
    gj_KeyboardManager_addKey($this, $rt_s(101), 17, $rt_s(102), 0);
    gj_KeyboardManager_addKey($this, $rt_s(103), 222, $rt_s(103), 0);
    $this.$jsKeyMap.$put($rt_s(104), $this.$gfKeyMap.$get0($rt_s(62)));
    $this.$jsKeyMap.$put($rt_s(105), $this.$gfKeyMap.$get0($rt_s(64)));
    $this.$jsKeyMap.$put($rt_s(106), $this.$gfKeyMap.$get0($rt_s(66)));
    $this.$jsKeyMap.$put($rt_s(107), $this.$gfKeyMap.$get0($rt_s(68)));
    $this.$jsKeyMap.$put($rt_s(108), $this.$gfKeyMap.$get0($rt_s(28)));
}
function gj_KeyboardManager_addKey($this, $jsName, $keyCode, $gfName, $inhibitDefault) {
    if ($jsName !== null)
        $this.$jsKeyMap.$put($jsName, jl_Integer_valueOf($this.$maxNamedKey));
    if ($keyCode)
        $this.$keyCodeMap.$put(jl_Integer_valueOf($keyCode), jl_Integer_valueOf($this.$maxNamedKey));
    $this.$gfKeyMap.$put($gfName, jl_Integer_valueOf($this.$maxNamedKey));
    $this.$preventDefault.data[$this.$maxNamedKey] = $inhibitDefault;
    $this.$maxNamedKey = $this.$maxNamedKey + 1 | 0;
}
function gj_KeyboardManager_buildKeyNameArray($this) {
    var var$1, $gfKey, $latchIdx;
    $this.$keyNames = $rt_createArray(jl_String, $this.$maxNamedKey);
    var$1 = ($this.$gfKeyMap.$keySet()).$iterator();
    while (var$1.$hasNext()) {
        $gfKey = var$1.$next1();
        $latchIdx = ($this.$gfKeyMap.$get0($gfKey)).$intValue();
        $this.$keyNames.data[$latchIdx] = $gfKey;
    }
}
function gj_KeyboardManager_handleEvent($this, $event) {
    var $key, $type, $keydown, $keyup, $keyname, $keyCode, $i, $keyLower, $idx;
    $key = $rt_str($event.key);
    $type = $rt_str($event.type);
    $keydown = $type.$equals($rt_s(109));
    $keyup = $type.$equals($rt_s(110));
    $keyname = null;
    if (!(!$keydown && !$keyup)) {
        if ($key === null) {
            $keyCode = $event.keyCode;
            $i = $this.$keyCodeMap.$get0(jl_Integer_valueOf($keyCode));
            if ($i !== null)
                $key = $keyname;
            else if ($keyCode >= 48 && $keyCode <= 57) {
                $i = jl_Integer_valueOf($this.$maxNamedKey);
                $key = (((jl_StringBuilder__init_()).$append8($rt_s(22))).$append0($keyCode & 65535)).$toString();
                gj_KeyboardManager_addKey($this, null, $keyCode, $key, 0);
            } else if ($keyCode < 65)
                $key = $keyname;
            else if ($keyCode > 90)
                $key = $keyname;
            else {
                $i = jl_Integer_valueOf($this.$maxNamedKey);
                $key = (((jl_StringBuilder__init_()).$append8($rt_s(22))).$append1(($keyCode & 65535) + 32 | 0)).$toString();
                gj_KeyboardManager_addKey($this, null, $keyCode, $key, 0);
            }
        } else {
            $keyLower = $key.$toLowerCase0();
            $i = $this.$jsKeyMap.$get0($key);
            if ($i === null) {
                $i = $this.$jsKeyMap.$get0($keyLower);
                if ($i !== null)
                    $this.$jsKeyMap.$put($key, $i);
            }
            if ($key.$length() > 2)
                $key = $keyname;
            else if ($i === null && $key.$length() <= 2) {
                $i = jl_Integer_valueOf($this.$maxNamedKey);
                gj_KeyboardManager_addKey($this, $keyLower, 0, $keyLower, 0);
            }
        }
        if ($i !== null) {
            $idx = $i.$intValue();
            if ($idx < $this.$preventDefault.data.length && $this.$preventDefault.data[$idx])
                $event.preventDefault();
            gj_KeyboardManager_checkKeyArrays($this, $i.$intValue());
            $this.$keyDown.data[$idx] = $keydown;
            if ($keydown) {
                $this.$keyLatched.data[$idx] = 1;
                $this.$lastKeyTyped = $idx >= $this.$keyNames.data.length ? null : $this.$keyNames.data[$idx];
                if ($this.$lastKeyTyped === null)
                    $this.$lastKeyTyped = $key;
            }
        }
    }
}
function gj_KeyboardManager_checkKeyArrays($this, $keycode) {
    var $nsize, $newKeyLatched, $newKeyDown, $i, var$6;
    $nsize = $keycode + 1 | 0;
    if ($nsize > $this.$numKeys) {
        $newKeyLatched = $rt_createBooleanArray($nsize);
        $newKeyDown = $rt_createBooleanArray($nsize);
        $i = 0;
        while ($i < $this.$numKeys) {
            var$6 = $newKeyDown.data;
            $newKeyLatched.data[$i] = $this.$keyLatched.data[$i];
            var$6[$i] = $this.$keyDown.data[$i];
            $i = $i + 1 | 0;
        }
        $this.$keyLatched = $newKeyLatched;
        $this.$keyDown = $newKeyDown;
        $this.$numKeys = $nsize;
    }
}
function gj_KeyboardManager_isKeyDown($this, $keyName) {
    var $i;
    $i = $this.$gfKeyMap.$get0($keyName.$toLowerCase0());
    if ($i !== null && $i.$intValue() < $this.$numKeys)
        return gj_KeyboardManager_isKeyDown0($this, $i.$intValue());
    return 0;
}
function gj_KeyboardManager_isKeyDown0($this, $latchIdx) {
    var $pressed;
    $pressed = !$this.$keyDown.data[$latchIdx] && !$this.$keyLatched.data[$latchIdx] ? 0 : 1;
    $this.$keyLatched.data[$latchIdx] = 0;
    return $pressed;
}
function gj_KeyboardManager_getKey($this) {
    var $r;
    $r = $this.$lastKeyTyped;
    $this.$lastKeyTyped = null;
    return $r;
}
function gj_KeyboardManager_clearLatches($this) {
    var $i;
    $i = 0;
    while ($i < $this.$keyLatched.data.length) {
        $this.$keyLatched.data[$i] = 0;
        $i = $i + 1 | 0;
    }
}
function gj_KeyboardManager_handleEvent0($this, var$1) {
    $this.$handleEvent2(var$1);
}
function gj_KeyboardManager_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode1 = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String_$callClinit() {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
}
function jl_String__init_2() {
    var var_0 = new jl_String();
    jl_String__init_1(var_0);
    return var_0;
}
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_3(var_1, var_0);
    return var_1;
}
function jl_String__init_0(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_4(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_5(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_6(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_1($this) {
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray(0);
}
function jl_String__init_3($this, $characters) {
    var var$2, var$3, $i;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_0($this);
    var$3 = var$2.length;
    $this.$characters = $rt_createCharArray(var$3);
    $i = 0;
    while ($i < var$3) {
        $this.$characters.data[$i] = var$2[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_4($this, $value, $offset, $count) {
    var $i, var$5;
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray($count);
    $i = 0;
    while ($i < $count) {
        var$5 = $value.data;
        $this.$characters.data[$i] = var$5[$i + $offset | 0];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_6($this, $codePoints, $offset, $count) {
    var $charCount, $i, var$6, var$7, $codePoint, var$9, var$10;
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray($count * 2 | 0);
    $charCount = 0;
    $i = 0;
    while ($i < $count) {
        var$6 = $codePoints.data;
        var$7 = $offset + 1 | 0;
        $codePoint = var$6[$offset];
        if ($codePoint < 65536) {
            var$6 = $this.$characters.data;
            var$9 = $charCount + 1 | 0;
            var$6[$charCount] = $codePoint & 65535;
        } else {
            var$6 = $this.$characters.data;
            var$10 = $charCount + 1 | 0;
            var$6[$charCount] = jl_Character_highSurrogate($codePoint);
            var$6 = $this.$characters.data;
            var$9 = var$10 + 1 | 0;
            var$6[var$10] = jl_Character_lowSurrogate($codePoint);
        }
        $i = $i + 1 | 0;
        $offset = var$7;
        $charCount = var$9;
    }
    if ($charCount < $this.$characters.data.length)
        $this.$characters = ju_Arrays_copyOf($this.$characters, $charCount);
}
function jl_String_charAt($this, $index) {
    if ($index >= 0 && $index < $this.$characters.data.length)
        return $this.$characters.data[$index];
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_isEmpty($this) {
    return $this.$characters.data.length ? 0 : 1;
}
function jl_String_startsWith($this, $prefix, $toffset) {
    var $i, var$4, var$5;
    if (($toffset + $prefix.$length() | 0) > $this.$length())
        return 0;
    $i = 0;
    while ($i < $prefix.$length()) {
        var$4 = $prefix.$charAt($i);
        var$5 = $toffset + 1 | 0;
        if (var$4 != $this.$charAt($toffset))
            return 0;
        $i = $i + 1 | 0;
        $toffset = var$5;
    }
    return 1;
}
function jl_String_startsWith0($this, $prefix) {
    if ($this === $prefix)
        return 1;
    return $this.$startsWith0($prefix, 0);
}
function jl_String_endsWith($this, $suffix) {
    var $j, $i, var$4, var$5;
    if ($this === $suffix)
        return 1;
    if ($suffix.$length() > $this.$length())
        return 0;
    $j = 0;
    $i = $this.$length() - $suffix.$length() | 0;
    while ($i < $this.$length()) {
        var$4 = $this.$charAt($i);
        var$5 = $j + 1 | 0;
        if (var$4 != $suffix.$charAt($j))
            return 0;
        $i = $i + 1 | 0;
        $j = var$5;
    }
    return 1;
}
function jl_String_indexOf($this, $ch, $fromIndex) {
    var $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$characters.data.length)
                return (-1);
            if ($this.$characters.data[$i] == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$characters.data.length - 1 | 0))
            return (-1);
        if ($this.$characters.data[$i] == $hi && $this.$characters.data[$i + 1 | 0] == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
}
function jl_String_indexOf0($this, $ch) {
    return $this.$indexOf0($ch, 0);
}
function jl_String_substring($this, $beginIndex, $endIndex) {
    if ($beginIndex > $endIndex)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    return jl_String__init_0($this.$characters, $beginIndex, $endIndex - $beginIndex | 0);
}
function jl_String_substring0($this, $beginIndex) {
    return $this.$substring($beginIndex, $this.$length());
}
function jl_String_toString($this) {
    return $this;
}
function jl_String_toCharArray($this) {
    var $array, $i, var$3;
    $array = $rt_createCharArray($this.$characters.data.length);
    $i = 0;
    while (true) {
        var$3 = $array.data;
        if ($i >= var$3.length)
            break;
        var$3[$i] = $this.$characters.data[$i];
        $i = $i + 1 | 0;
    }
    return $array;
}
function jl_String_equals($this, $other) {
    var $str, $i;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    if ($str.$length() != $this.$length())
        return 0;
    $i = 0;
    while ($i < $str.$length()) {
        if ($this.$charAt($i) != $str.$charAt($i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    a: {
        if (!$this.$hashCode1) {
            var$1 = $this.$characters.data;
            var$2 = var$1.length;
            var$3 = 0;
            while (true) {
                if (var$3 >= var$2)
                    break a;
                $c = var$1[var$3];
                $this.$hashCode1 = (31 * $this.$hashCode1 | 0) + $c | 0;
                var$3 = var$3 + 1 | 0;
            }
        }
    }
    return $this.$hashCode1;
}
function jl_String_toLowerCase($this) {
    var $codePoints, $codePointCount, $i, var$4, var$5, var$6, var$7, var$8;
    if ($this.$isEmpty())
        return $this;
    $codePoints = $rt_createIntArray($this.$characters.data.length);
    $codePointCount = 0;
    $i = 0;
    while ($i < $this.$characters.data.length) {
        a: {
            if ($i != ($this.$characters.data.length - 1 | 0) && jl_Character_isHighSurrogate($this.$characters.data[$i])) {
                var$4 = $this.$characters.data;
                var$5 = $i + 1 | 0;
                var$6 = var$4[var$5];
                if (jl_Character_isLowSurrogate(var$6)) {
                    var$7 = $codePoints.data;
                    var$8 = $codePointCount + 1 | 0;
                    var$7[$codePointCount] = jl_Character_toLowerCase0(jl_Character_toCodePoint($this.$characters.data[$i], $this.$characters.data[var$5]));
                    $i = var$5;
                    break a;
                }
            }
            var$7 = $codePoints.data;
            var$8 = $codePointCount + 1 | 0;
            var$7[$codePointCount] = jl_Character_toLowerCase($this.$characters.data[$i]);
        }
        $i = $i + 1 | 0;
        $codePointCount = var$8;
    }
    return jl_String__init_5($codePoints, 0, $codePointCount);
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_84_0__init_();
}
var otcic_StderrOutputStream = $rt_classWithoutFields(otcic_ConsoleOutputStream);
var otcic_StderrOutputStream_INSTANCE = null;
function otcic_StderrOutputStream_$callClinit() {
    otcic_StderrOutputStream_$callClinit = $rt_eraseClinit(otcic_StderrOutputStream);
    otcic_StderrOutputStream__clinit_();
}
function otcic_StderrOutputStream__init_0() {
    var var_0 = new otcic_StderrOutputStream();
    otcic_StderrOutputStream__init_(var_0);
    return var_0;
}
function otcic_StderrOutputStream__init_($this) {
    otcic_StderrOutputStream_$callClinit();
    otcic_ConsoleOutputStream__init_($this);
}
function otcic_StderrOutputStream_write($this, $b, $off, $len) {
    otcic_Console_writeStderr($b, $off, $len);
}
function otcic_StderrOutputStream__clinit_() {
    otcic_StderrOutputStream_INSTANCE = otcic_StderrOutputStream__init_0();
}
var gp_SimulationDelegate = $rt_classWithoutFields(0);
function gj_Client$2() {
    jl_Object.call(this);
    this.$this$09 = null;
}
function gj_Client$2__init_(var_0) {
    var var_1 = new gj_Client$2();
    gj_Client$2__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$2__init_0($this, $this$0) {
    $this.$this$09 = $this$0;
    jl_Object__init_0($this);
}
function gj_Client$2_setSpeed($this, $speed) {}
function gj_Client$1() {
    otc_ResourceSource.call(this);
    this.$this$010 = null;
}
function gj_Client$1__init_(var_0) {
    var var_1 = new gj_Client$1();
    gj_Client$1__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$1__init_0($this, $this$0) {
    $this.$this$010 = $this$0;
    otc_ResourceSource__init_($this);
}
function gj_Client$4() {
    jl_Object.call(this);
    this.$this$011 = null;
}
function gj_Client$4__init_(var_0) {
    var var_1 = new gj_Client$4();
    gj_Client$4__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$4__init_0($this, $this$0) {
    $this.$this$011 = $this$0;
    jl_Object__init_0($this);
}
var ge_SimulationListener = $rt_classWithoutFields(0);
function gj_Client$3() {
    var a = this; jl_Object.call(a);
    a.$val$speedSlider = null;
    a.$val$simulation = null;
    a.$val$resetButton = null;
    a.$val$playButton = null;
    a.$this$012 = null;
}
function gj_Client$3__init_(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new gj_Client$3();
    gj_Client$3__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function gj_Client$3__init_0($this, $this$0, var$2, var$3, var$4, var$5) {
    $this.$this$012 = $this$0;
    $this.$val$speedSlider = var$2;
    $this.$val$simulation = var$3;
    $this.$val$resetButton = var$4;
    $this.$val$playButton = var$5;
    jl_Object__init_0($this);
}
function gj_Client$3_simulationChanged($this, $e) {
    var var$2, var$3;
    if ($e.$getType0() == 2) {
        var$2 = $this.$val$speedSlider;
        var$3 = $rt_ustr((((jl_StringBuilder__init_()).$append8($rt_s(22))).$append1($this.$val$simulation.$getSpeed())).$toString());
        var$2.value = var$3;
    } else if (!$e.$getType0()) {
        var$2 = $this.$val$speedSlider;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$resetButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = "Pause";
        var$2.innerHTML = var$3;
        (gj_Client_access$000($this.$this$012)).focus();
        gj_Client_access$102($this.$this$012, 0);
    } else if ($e.$getType0() == 1) {
        var$2 = $this.$val$speedSlider;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$resetButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = "Run";
        var$2.innerHTML = var$3;
        gj_Client_access$102($this.$this$012, 1);
    } else if ($e.$getType0() == 3) {
        var$2 = $this.$val$speedSlider;
        var$3 = !!1;
        var$2.disabled = var$3;
        var$2 = $this.$val$resetButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = !!1;
        var$2.disabled = var$3;
    }
}
var jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException);
function jl_NegativeArraySizeException__init_() {
    var var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_0(var_0);
    return var_0;
}
function jl_NegativeArraySizeException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function g_TreeActorSet$TasIterator() {
    var a = this; jl_Object.call(a);
    a.$setIterator = null;
    a.$currentSet = null;
    a.$actorIterator = null;
    a.$this$013 = null;
}
function g_TreeActorSet$TasIterator__init_(var_0) {
    var var_1 = new g_TreeActorSet$TasIterator();
    g_TreeActorSet$TasIterator__init_0(var_1, var_0);
    return var_1;
}
function g_TreeActorSet$TasIterator__init_0($this, $this$0) {
    $this.$this$013 = $this$0;
    jl_Object__init_0($this);
    $this.$setIterator = (g_TreeActorSet_access$000($this$0)).$iterator();
    $this.$currentSet = $this.$setIterator.$next1();
    while ($this.$currentSet.$isEmpty() && $this.$setIterator.$hasNext()) {
        $this.$currentSet = $this.$setIterator.$next1();
    }
    $this.$actorIterator = $this.$currentSet.$iterator();
}
function g_TreeActorSet$TasIterator_next($this) {
    $this.$hasNext();
    return $this.$actorIterator.$next1();
}
function g_TreeActorSet$TasIterator_hasNext($this) {
    if ($this.$actorIterator.$hasNext())
        return 1;
    if (!$this.$setIterator.$hasNext())
        return 0;
    a: {
        while (true) {
            if (!$this.$setIterator.$hasNext())
                break a;
            $this.$currentSet = $this.$setIterator.$next1();
            if ($this.$currentSet.$isEmpty())
                continue;
            else
                break;
        }
    }
    $this.$actorIterator = $this.$currentSet.$iterator();
    return $this.$actorIterator.$hasNext();
}
function g_TreeActorSet$TasIterator_next0($this) {
    return $this.$next4();
}
function jnci_BufferedEncoder() {
    var a = this; jnc_CharsetEncoder.call(a);
    a.$inArray = null;
    a.$outArray = null;
}
function jnci_BufferedEncoder__init_($this, $cs, $averageBytesPerChar, $maxBytesPerChar) {
    jnc_CharsetEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar);
    $this.$inArray = $rt_createCharArray(512);
    $this.$outArray = $rt_createByteArray(512);
}
function jnci_BufferedEncoder_encodeLoop($this, $in, $out) {
    var $inArray, $inPos, $inSize, $outArray, $i, var$8, var$9, $result, $outPos, $outSize, $controller;
    $inArray = $this.$inArray;
    $inPos = 0;
    $inSize = 0;
    $outArray = $this.$outArray;
    a: {
        while (true) {
            if (($inPos + 32 | 0) > $inSize && jn_Buffer_hasRemaining($in)) {
                $i = $inPos;
                while ($i < $inSize) {
                    var$8 = $inArray.data;
                    var$8[$i - $inPos | 0] = var$8[$i];
                    $i = $i + 1 | 0;
                }
                var$8 = $inArray.data;
                var$9 = $inSize - $inPos | 0;
                $inSize = jl_Math_min(jn_Buffer_remaining($in) + var$9 | 0, var$8.length);
                $in.$get3($inArray, var$9, $inSize - var$9 | 0);
                $inPos = 0;
            }
            if (!jn_Buffer_hasRemaining($out)) {
                if (!jn_Buffer_hasRemaining($in) && $inPos >= $inSize) {
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                } else {
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                }
                break a;
            }
            var$8 = $outArray.data;
            $outPos = 0;
            $outSize = jl_Math_min(jn_Buffer_remaining($out), var$8.length);
            $controller = jnci_BufferedEncoder$Controller__init_($in, $out);
            $result = $this.$arrayEncode($inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller);
            $inPos = $controller.$inPosition;
            var$9 = $controller.$outPosition;
            if ($result === null) {
                if (!jn_Buffer_hasRemaining($in) && $inPos >= $inSize) {
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                } else if (!jn_Buffer_hasRemaining($out) && $inPos >= $inSize) {
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                }
            }
            $out.$put1($outArray, 0, var$9);
            if ($result !== null)
                break;
        }
    }
    $in.$position0(jn_Buffer_position($in) - ($inSize - $inPos | 0) | 0);
    return $result;
}
var jnci_UTF8Encoder = $rt_classWithoutFields(jnci_BufferedEncoder);
function jnci_UTF8Encoder__init_(var_0) {
    var var_1 = new jnci_UTF8Encoder();
    jnci_UTF8Encoder__init_0(var_1, var_0);
    return var_1;
}
function jnci_UTF8Encoder__init_0($this, $cs) {
    jnci_BufferedEncoder__init_($this, $cs, 2.0, 4.0);
}
function jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) {
    var $result, var$9, var$10, $ch, var$12, var$13, var$14, $low, $codePoint;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize) {
                var$9 = $inPos;
                break a;
            }
            var$10 = $inArray.data;
            var$9 = $inPos + 1 | 0;
            $ch = var$10[$inPos];
            if ($ch < 128) {
                var$10 = $outArray.data;
                var$12 = $outPos + 1 | 0;
                var$10[$outPos] = $ch << 24 >> 24;
            } else if ($ch < 2048) {
                if (($outPos + 2 | 0) > $outSize) {
                    var$9 = var$9 + (-1) | 0;
                    if ($controller.$hasMoreOutput(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                var$13 = $outPos + 1 | 0;
                var$10[$outPos] = (192 | $ch >> 6) << 24 >> 24;
                var$12 = var$13 + 1 | 0;
                var$10[var$13] = (128 | $ch & 63) << 24 >> 24;
            } else if (!jl_Character_isSurrogate($ch)) {
                if (($outPos + 3 | 0) > $outSize) {
                    var$9 = var$9 + (-1) | 0;
                    if ($controller.$hasMoreOutput(3))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                var$14 = $outPos + 1 | 0;
                var$10[$outPos] = (224 | $ch >> 12) << 24 >> 24;
                var$13 = var$14 + 1 | 0;
                var$10[var$14] = (128 | $ch >> 6 & 63) << 24 >> 24;
                var$12 = var$13 + 1 | 0;
                var$10[var$13] = (128 | $ch & 63) << 24 >> 24;
            } else {
                if (!jl_Character_isHighSurrogate($ch)) {
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (var$9 >= $inSize) {
                    if ($controller.$hasMoreInput())
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                var$13 = var$9 + 1 | 0;
                $low = var$10[var$9];
                if (!jl_Character_isLowSurrogate($low)) {
                    var$9 = var$13 + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (($outPos + 4 | 0) > $outSize) {
                    var$9 = var$13 + (-2) | 0;
                    if ($controller.$hasMoreOutput(4))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                $codePoint = jl_Character_toCodePoint($ch, $low);
                var$9 = $outPos + 1 | 0;
                var$10[$outPos] = (240 | $codePoint >> 18) << 24 >> 24;
                var$14 = var$9 + 1 | 0;
                var$10[var$9] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                var$9 = var$14 + 1 | 0;
                var$10[var$14] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                var$12 = var$9 + 1 | 0;
                var$10[var$9] = (128 | $codePoint & 63) << 24 >> 24;
                var$9 = var$13;
            }
            $inPos = var$9;
            $outPos = var$12;
        }
        var$9 = $inPos;
    }
    $controller.$setInPosition(var$9);
    $controller.$setOutPosition($outPos);
    return $result;
}
function ju_Hashtable() {
    var a = this; ju_Dictionary.call(a);
    a.$elementCount = 0;
    a.$elementData0 = null;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
    a.$firstSlot = 0;
    a.$lastSlot = 0;
    a.$modCount2 = 0;
}
var ju_Hashtable_EMPTY_ENUMERATION = null;
var ju_Hashtable_EMPTY_ITERATOR = null;
function ju_Hashtable_$callClinit() {
    ju_Hashtable_$callClinit = $rt_eraseClinit(ju_Hashtable);
    ju_Hashtable__clinit_();
}
function ju_Hashtable__init_0() {
    var var_0 = new ju_Hashtable();
    ju_Hashtable__init_(var_0);
    return var_0;
}
function ju_Hashtable__init_1(var_0) {
    var var_1 = new ju_Hashtable();
    ju_Hashtable__init_2(var_1, var_0);
    return var_1;
}
function ju_Hashtable_newEntry($key, $value, $hash) {
    ju_Hashtable_$callClinit();
    return ju_Hashtable$Entry__init_($key, $value);
}
function ju_Hashtable__init_($this) {
    ju_Hashtable_$callClinit();
    ju_Hashtable__init_2($this, 11);
}
function ju_Hashtable__init_2($this, $capacity) {
    ju_Hashtable_$callClinit();
    ju_Dictionary__init_($this);
    $this.$lastSlot = (-1);
    if ($capacity < 0)
        $rt_throw(jl_IllegalArgumentException__init_0());
    $this.$elementCount = 0;
    if (!$capacity)
        $capacity = 1;
    $this.$elementData0 = ju_Hashtable_newElementArray($this, $capacity);
    $this.$firstSlot = $this.$elementData0.data.length;
    $this.$loadFactor = 0.75;
    ju_Hashtable_computeMaxSize($this);
}
function ju_Hashtable_newElementArray($this, $size) {
    return $rt_createArray(ju_Hashtable$Entry, $size);
}
function ju_Hashtable_computeMaxSize($this) {
    $this.$threshold = $this.$elementData0.data.length * $this.$loadFactor | 0;
}
function ju_Hashtable_get($this, $key) {
    var $hash, $index, $entry;
    jl_Object_monitorEnterSync($this);
    try {
        $hash = $key.$hashCode0();
        $index = ($hash & 2147483647) % $this.$elementData0.data.length | 0;
        $entry = $this.$elementData0.data[$index];
        while ($entry !== null) {
            if ($entry.$equalsKey($key, $hash))
                return $entry.$value0;
            $entry = $entry.$next;
        }
        return null;
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function ju_Hashtable_put($this, $key, $value) {
    var $hash, var$4, $index, $entry, $result, var$8, var$9;
    jl_Object_monitorEnterSync($this);
    try {
        if ($key !== null && $value !== null) {
            $hash = $key.$hashCode0();
            var$4 = $hash & 2147483647;
            $index = var$4 % $this.$elementData0.data.length | 0;
            $entry = $this.$elementData0.data[$index];
            while ($entry !== null && !$entry.$equalsKey($key, $hash)) {
                $entry = $entry.$next;
            }
            if ($entry !== null) {
                $result = $entry.$value0;
                $entry.$value0 = $value;
                return $result;
            }
            $this.$modCount2 = $this.$modCount2 + 1 | 0;
            var$8 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$8;
            if (var$8 > $this.$threshold) {
                $this.$rehash();
                $index = var$4 % $this.$elementData0.data.length | 0;
            }
            if ($index < $this.$firstSlot)
                $this.$firstSlot = $index;
            if ($index > $this.$lastSlot)
                $this.$lastSlot = $index;
            var$9 = ju_Hashtable_newEntry($key, $value, $hash);
            var$9.$next = $this.$elementData0.data[$index];
            $this.$elementData0.data[$index] = var$9;
            return null;
        }
        $rt_throw(jl_NullPointerException__init_());
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function ju_Hashtable_rehash($this) {
    var $length, $newLast, $newData, $i, var$5, $entry, $index, var$8, $entry_0;
    $length = ($this.$elementData0.data.length << 1) + 1 | 0;
    if (!$length)
        $length = 1;
    $newLast = (-1);
    $newData = ju_Hashtable_newElementArray($this, $length);
    $i = $this.$lastSlot + 1 | 0;
    var$5 = $length;
    while (true) {
        $i = $i + (-1) | 0;
        if ($i < $this.$firstSlot)
            break;
        $entry = $this.$elementData0.data[$i];
        while ($entry !== null) {
            $index = ($entry.$getKeyHash() & 2147483647) % $length | 0;
            if ($index < var$5)
                var$5 = $index;
            if ($index > $newLast)
                $newLast = $index;
            var$8 = $newData.data;
            $entry_0 = $entry.$next;
            $entry.$next = var$8[$index];
            var$8[$index] = $entry;
            $entry = $entry_0;
        }
    }
    $this.$firstSlot = var$5;
    $this.$lastSlot = $newLast;
    $this.$elementData0 = $newData;
    ju_Hashtable_computeMaxSize($this);
}
function ju_Hashtable__clinit_() {
    ju_Hashtable_EMPTY_ENUMERATION = ju_Hashtable$1__init_();
    ju_Hashtable_EMPTY_ITERATOR = ju_Hashtable$2__init_();
}
function ju_Properties() {
    ju_Hashtable.call(this);
    this.$defaults = null;
}
function ju_Properties__init_0() {
    var var_0 = new ju_Properties();
    ju_Properties__init_(var_0);
    return var_0;
}
function ju_Properties__init_($this) {
    ju_Hashtable__init_($this);
}
function ju_Properties_getProperty($this, $name) {
    var $result, $property;
    $result = ju_Hashtable_get($this, $name);
    $property = !($result instanceof jl_String) ? null : $result;
    if ($property === null && $this.$defaults !== null)
        $property = $this.$defaults.$getProperty($name);
    return $property;
}
function ju_Properties_load($this, $in) {
    var $mode, $unicode, $count, $buf, $offset, $keyLength, $firstChar, $bis, $intVal, var$11, var$12, $temp, $nextChar, var$15, $newBuf, $digit, var$18, var$19;
    jl_Object_monitorEnterSync($this);
    try {
        if ($in === null)
            $rt_throw(jl_NullPointerException__init_());
        $mode = 0;
        $unicode = 0;
        $count = 0;
        $buf = $rt_createCharArray(40);
        $offset = 0;
        $keyLength = (-1);
        $firstChar = 1;
        $bis = ji_BufferedInputStream__init_($in);
        a: while (true) {
            $intVal = $bis.$read1();
            if ($intVal == (-1)) {
                if ($mode == 2 && $count < 4)
                    $rt_throw(jl_IllegalArgumentException__init_1($rt_s(111)));
                if ($mode != 1)
                    var$11 = $offset;
                else {
                    var$12 = $buf.data;
                    var$11 = $offset + 1 | 0;
                    var$12[$offset] = 0;
                }
                if ($keyLength == (-1) && var$11 > 0)
                    $keyLength = var$11;
                if ($keyLength >= 0) {
                    $temp = jl_String__init_0($buf, 0, var$11);
                    $this.$put($temp.$substring(0, $keyLength), $temp.$substring0($keyLength));
                }
                return;
            }
            var$12 = $buf.data;
            $nextChar = $intVal & 255 & 65535;
            var$15 = var$12.length;
            if ($offset != var$15)
                $newBuf = $buf;
            else {
                $newBuf = $rt_createCharArray(var$15 * 2 | 0);
                jl_System_arraycopy($buf, 0, $newBuf, 0, $offset);
            }
            if ($mode == 2) {
                $digit = jl_Character_digit($nextChar, 16);
                if ($digit >= 0) {
                    $unicode = ($unicode << 4) + $digit | 0;
                    $count = $count + 1 | 0;
                    if ($count < 4) {
                        $buf = $newBuf;
                        continue;
                    }
                } else if ($count <= 4)
                    break;
                var$12 = $newBuf.data;
                $mode = 0;
                var$11 = $offset + 1 | 0;
                var$12[$offset] = $unicode & 65535;
                if ($nextChar != 10) {
                    $buf = $newBuf;
                    $offset = var$11;
                    continue;
                }
                $offset = var$11;
            }
            if ($mode == 1)
                b: {
                    $mode = 0;
                    switch ($nextChar) {
                        case 10:
                            break;
                        case 13:
                            $mode = 3;
                            $buf = $newBuf;
                            continue a;
                        case 98:
                            $nextChar = 8;
                            break b;
                        case 102:
                            $nextChar = 12;
                            break b;
                        case 110:
                            $nextChar = 10;
                            break b;
                        case 114:
                            $nextChar = 13;
                            break b;
                        case 116:
                            $nextChar = 9;
                            break b;
                        case 117:
                            $mode = 2;
                            $unicode = 0;
                            $count = 0;
                            $buf = $newBuf;
                            continue a;
                        default:
                            break b;
                    }
                    $mode = 5;
                    $buf = $newBuf;
                    continue a;
                }
            else {
                c: {
                    d: {
                        e: {
                            switch ($nextChar) {
                                case 10:
                                    if ($mode != 3)
                                        break e;
                                    $mode = 5;
                                    $buf = $newBuf;
                                    continue a;
                                case 13:
                                    break e;
                                case 33:
                                case 35:
                                    break d;
                                case 58:
                                case 61:
                                    if ($keyLength != (-1))
                                        break c;
                                    $mode = 0;
                                    var$11 = $offset;
                                    $keyLength = $offset;
                                    $buf = $newBuf;
                                    $offset = var$11;
                                    continue a;
                                case 92:
                                    break;
                                default:
                                    break c;
                            }
                            if ($mode == 4)
                                $keyLength = $offset;
                            $mode = 1;
                            $buf = $newBuf;
                            continue a;
                        }
                        f: {
                            $mode = 0;
                            $firstChar = 1;
                            if ($offset <= 0) {
                                if ($offset)
                                    break f;
                                if ($keyLength)
                                    break f;
                            }
                            if ($keyLength == (-1))
                                $keyLength = $offset;
                            $temp = jl_String__init_0($newBuf, 0, $offset);
                            var$18 = $temp.$substring(0, $keyLength);
                            var$19 = $temp.$substring0($keyLength);
                            $this.$put(var$18, var$19);
                        }
                        $keyLength = (-1);
                        $offset = 0;
                        $buf = $newBuf;
                        continue a;
                    }
                    if ($firstChar) {
                        while (true) {
                            var$11 = $bis.$read1();
                            if (var$11 == (-1))
                                break;
                            var$11 = var$11 & 65535;
                            if (var$11 == 13) {
                                $buf = $newBuf;
                                continue a;
                            }
                            if (var$11 != 10)
                                continue;
                            else {
                                $buf = $newBuf;
                                continue a;
                            }
                        }
                        $buf = $newBuf;
                        continue a;
                    }
                }
                if (jl_Character_isWhitespace($nextChar)) {
                    if ($mode == 3)
                        $mode = 5;
                    if (!$offset) {
                        $buf = $newBuf;
                        continue;
                    }
                    if ($offset == $keyLength) {
                        $buf = $newBuf;
                        continue;
                    }
                    if ($mode == 5) {
                        $buf = $newBuf;
                        continue;
                    }
                    if ($keyLength == (-1)) {
                        $mode = 4;
                        $buf = $newBuf;
                        continue;
                    }
                }
                if (!($mode != 5 && $mode != 3))
                    $mode = 0;
            }
            $firstChar = 0;
            if ($mode == 4) {
                $mode = 0;
                $keyLength = $offset;
            }
            var$12 = $newBuf.data;
            var$11 = $offset + 1 | 0;
            var$12[$offset] = $nextChar;
            $buf = $newBuf;
            $offset = var$11;
        }
        $rt_throw(jl_IllegalArgumentException__init_1($rt_s(112)));
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
var jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException);
function jl_NumberFormatException__init_() {
    var var_0 = new jl_NumberFormatException();
    jl_NumberFormatException__init_2(var_0);
    return var_0;
}
function jl_NumberFormatException__init_1(var_0) {
    var var_1 = new jl_NumberFormatException();
    jl_NumberFormatException__init_0(var_1, var_0);
    return var_1;
}
function jl_NumberFormatException__init_2($this) {
    jl_IllegalArgumentException__init_2($this);
}
function jl_NumberFormatException__init_0($this, $message) {
    jl_IllegalArgumentException__init_($this, $message);
}
var gc_NeighbourCollisionQuery = $rt_classWithoutFields();
function gc_NeighbourCollisionQuery__init_() {
    var var_0 = new gc_NeighbourCollisionQuery();
    gc_NeighbourCollisionQuery__init_0(var_0);
    return var_0;
}
function gc_NeighbourCollisionQuery__init_0($this) {
    jl_Object__init_0($this);
}
function gc_WorldHandler() {
    var a = this; jl_Object.call(a);
    a.$canvas = null;
    a.$theWorld = null;
    a.$simulation = null;
    a.$keyboardManager = null;
    a.$mouseManager0 = null;
    a.$touchManager = null;
    a.$onMenuHandler = null;
    a.$fontMetrics = null;
    a.$fontSize = 0;
    a.$repaintScheduled = 0;
}
var gc_WorldHandler_instance = null;
function gc_WorldHandler__init_(var_0) {
    var var_1 = new gc_WorldHandler();
    gc_WorldHandler__init_0(var_1, var_0);
    return var_1;
}
function gc_WorldHandler__init_0($this, $canvas) {
    var var$2, var$3;
    jl_Object__init_0($this);
    $this.$repaintScheduled = 0;
    $this.$canvas = $canvas;
    $this.$keyboardManager = gj_KeyboardManager__init_0();
    otjde_KeyboardEventTarget_listenKeyDown$static($canvas, $this.$keyboardManager);
    otjde_KeyboardEventTarget_listenKeyUp$static($canvas, $this.$keyboardManager);
    otjde_KeyboardEventTarget_listenKeyPress$static($canvas, $this.$keyboardManager);
    $this.$mouseManager0 = gj_MouseManager__init_($this);
    $this.$touchManager = gj_TouchManager__init_($this.$mouseManager0);
    $this.$onMenuHandler = gc_WorldHandler$1__init_($this);
    var$2 = $this.$onMenuHandler;
    $canvas.addEventListener("contextmenu", otji_JS_function(var$2, "handleEvent"));
    var$3 = 0;
    $canvas.tabIndex = var$3;
    $canvas.focus();
}
function gc_WorldHandler_initialise($canvas) {
    gc_WorldHandler_instance = gc_WorldHandler__init_($canvas);
}
function gc_WorldHandler_enableMouseListening($this) {
    var var$1, var$2;
    otjde_MouseEventTarget_listenClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenDoubleClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseDown$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseUp$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseEnter$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseLeave$static($this.$canvas, $this.$mouseManager0);
    var$1 = $this.$canvas;
    var$2 = $this.$mouseManager0;
    var$1.addEventListener("mousemove", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.addEventListener("touchstart", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.addEventListener("touchend", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.addEventListener("touchcancel", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.addEventListener("touchmove", otji_JS_function(var$2, "handleEvent"));
}
function gc_WorldHandler_disableMouseListening($this) {
    var var$1, var$2;
    otjde_MouseEventTarget_neglectClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectDoubleClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseDown$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseUp$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseEnter$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseLeave$static($this.$canvas, $this.$mouseManager0);
    var$1 = $this.$canvas;
    var$2 = $this.$mouseManager0;
    var$1.removeEventListener("mousemove", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.removeEventListener("touchstart", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.removeEventListener("touchend", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.removeEventListener("touchcancel", otji_JS_function(var$2, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $this.$touchManager;
    var$1.removeEventListener("touchmove", otji_JS_function(var$2, "handleEvent"));
}
function gc_WorldHandler_getInstance() {
    return gc_WorldHandler_instance;
}
function gc_WorldHandler_getKeyboardManager($this) {
    return $this.$keyboardManager;
}
function gc_WorldHandler_setInitialisingWorld($this, $world) {}
function gc_WorldHandler_objectAddedToWorld($this, $object) {}
function gc_WorldHandler_doRepaint($this) {
    var var$1, $curWorld, $bgImage;
    var$1 = $this.$canvas.getContext("2d");
    $curWorld = $this.$theWorld;
    if ($curWorld !== null) {
        $bgImage = $curWorld.$getBackground();
        if ($bgImage !== null)
            g_ImageVisitor_drawImageToCanvas($bgImage, var$1, 0.0, 0.0);
        gc_WorldHandler_paintObjects($this, var$1);
        gc_WorldHandler_paintWorldText($this, $curWorld, var$1);
    }
}
function gc_WorldHandler_getWorld($this) {
    return $this.$theWorld;
}
function gc_WorldHandler_setWorld($this, $world) {
    var var$2, var$3, var$4;
    $this.$theWorld = $world;
    var$2 = $this.$canvas;
    var$3 = g_WorldVisitor_getWidthInPixels($world);
    var$2.width = var$3;
    var$2 = $this.$canvas;
    var$4 = g_WorldVisitor_getHeightInPixels($world);
    var$2.height = var$4;
    gc_WorldHandler_doRepaint($this);
    $this.$simulation.$worldCreated(ge_WorldEvent__init_($world));
    $this.$enableMouseListening();
}
function gc_WorldHandler_repaint($this) {
    if (!$this.$repaintScheduled) {
        $this.$repaintScheduled = 1;
        $rt_globals.requestAnimationFrame(otji_JS_function(gc_WorldHandler$2__init_($this), "doRepaint"));
    }
}
function gc_WorldHandler_paintObjects($this, $g) {
    var $world, $objects, $paintSeq, $iter, $thing, $cellSize, $image, var$9, $halfWidth, $halfHeight, $ax, $ay, var$14, var$15, $xCenter, $paintX, $yCenter, $paintY, $rotation, var$21, var$22, $$je;
    $world = $this.$theWorld;
    $objects = g_WorldVisitor_getObjectsListInPaintOrder($world);
    $paintSeq = 0;
    $iter = $objects.$iterator();
    while ($iter.$hasNext()) {
        $thing = $iter.$next1();
        $cellSize = g_WorldVisitor_getCellSize($world);
        $image = g_ActorVisitor_getDisplayImage($thing);
        if ($image !== null) {
            var$9 = $paintSeq + 1 | 0;
            g_ActorVisitor_setLastPaintSeqNum($thing, $paintSeq);
            $halfWidth = $image.$getWidth() / 2.0;
            $halfHeight = $image.$getHeight() / 2.0;
            a: {
                try {
                    $ax = g_ActorVisitor_getX($thing);
                    $ay = g_ActorVisitor_getY($thing);
                    var$14 = $rt_imul($ax, $cellSize);
                    var$15 = $cellSize / 2.0;
                    $xCenter = var$14 + var$15;
                    $paintX = jl_Math_floor($xCenter - $halfWidth) | 0;
                    $yCenter = $rt_imul($ay, $cellSize) + var$15;
                    $paintY = jl_Math_floor($yCenter - $halfHeight) | 0;
                    $rotation = g_ActorVisitor_getRotation($thing);
                    if (!$rotation) {
                        var$21 = $image.$getTransparency() / 255.0;
                        $g.globalAlpha = var$21;
                        g_ImageVisitor_drawImageToCanvas($image, $g, $paintX, $paintY);
                    } else {
                        $g.save();
                        $g.translate($xCenter, $yCenter);
                        var$15 = jl_Math_toRadians($rotation);
                        $g.rotate(var$15);
                        var$15 =  -$xCenter;
                        var$14 =  -$yCenter;
                        $g.translate(var$15, var$14);
                        var$22 = $image.$getTransparency() / 255.0;
                        $g.globalAlpha = var$22;
                        g_ImageVisitor_drawImageToCanvas($image, $g, $paintX, $paintY);
                        $g.restore();
                    }
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_IllegalStateException) {
                    } else {
                        throw $$e;
                    }
                }
            }
            var$22 = 1.0;
            $g.globalAlpha = var$22;
            $paintSeq = var$9;
        }
    }
}
function gc_WorldHandler_paintWorldText($this, $world, $g) {
    var $labels, $textHeight, $scaleFactor, var$6, $cellsize, $label;
    $labels = g_WorldVisitor_getTextLabels($world);
    if ($labels.$isEmpty())
        return;
    if ($this.$fontMetrics === null) {
        $textHeight = gu_GraphicsUtilities_getFontHeightPx($rt_s(113));
        $scaleFactor = 25.0 / $textHeight;
        $this.$fontSize = 25.0 * $scaleFactor | 0;
        $this.$fontMetrics = gu_GraphicsUtilities_getFontMetricsPx(((((jl_StringBuilder__init_()).$append8($rt_s(114))).$append1($this.$fontSize)).$append8($rt_s(115))).$toString());
    }
    var$6 = $rt_ustr(((((jl_StringBuilder__init_()).$append8($rt_s(114))).$append1($this.$fontSize)).$append8($rt_s(115))).$toString());
    $g.font = var$6;
    var$6 = "#FFFFFF";
    $g.fillStyle = var$6;
    var$6 = "#000000";
    $g.strokeStyle = var$6;
    $cellsize = g_WorldVisitor_getCellSize($world);
    var$6 = $labels.$iterator();
    while (var$6.$hasNext()) {
        $label = var$6.$next1();
        $label.$draw($g, $this.$fontMetrics, $cellsize);
    }
}
function gc_WorldHandler_getObject($world, $x, $y) {
    var $objectsThere, $iter, $topmostActor, $seq, $actor, $actorSeq;
    if ($world === null)
        return null;
    $objectsThere = g_WorldVisitor_getObjectsAtPixel($world, $x, $y);
    if ($objectsThere.$isEmpty())
        return null;
    $iter = $objectsThere.$iterator();
    $topmostActor = $iter.$next1();
    $seq = g_ActorVisitor_getLastPaintSeqNum($topmostActor);
    while ($iter.$hasNext()) {
        $actor = $iter.$next1();
        $actorSeq = g_ActorVisitor_getLastPaintSeqNum($actor);
        if ($actorSeq > $seq) {
            $topmostActor = $actor;
            $seq = $actorSeq;
        }
    }
    return $topmostActor;
}
function gc_WorldHandler_addWorldListener($this, $simulation) {
    $this.$simulation = $simulation;
}
function gc_WorldHandler_simulationChanged($this, $e) {
    var $world;
    if ($e.$getType0() == 7) {
        $world = $this.$theWorld;
        if ($world !== null) {
            g_WorldVisitor_startSequence($world);
            $this.$mouseManager0.$newActStarted();
        }
    }
}
function gc_WorldHandler_hasWorld($this) {
    return $this.$theWorld === null ? 0 : 1;
}
function gc_WorldHandler_discardWorld($this) {
    $this.$simulation.$worldRemoved(ge_WorldEvent__init_(null));
    $this.$disableMouseListening();
}
function gc_WorldHandler_getTopMostActorAt($this, $x, $y) {
    var $tr;
    $tr = $this.$canvas.getBoundingClientRect();
    return gc_WorldHandler_getObject($this.$theWorld, $x - $tr.left | 0, $y - $tr.top | 0);
}
function gc_WorldHandler_getTranslatedX($this, $x) {
    var $tr;
    $tr = $this.$canvas.getBoundingClientRect();
    return g_WorldVisitor_toCellFloor($this.$theWorld, $x - $tr.left | 0);
}
function gc_WorldHandler_getTranslatedY($this, $y) {
    var $tr;
    $tr = $this.$canvas.getBoundingClientRect();
    return g_WorldVisitor_toCellFloor($this.$theWorld, $y - $tr.top | 0);
}
function gc_WorldHandler_access$000($x0) {
    gc_WorldHandler_doRepaint($x0);
}
function gc_WorldHandler_access$102($x0, $x1) {
    $x0.$repaintScheduled = $x1;
    return $x1;
}
var jnci_UTF8Charset = $rt_classWithoutFields(jnc_Charset);
var jnci_UTF8Charset_INSTANCE = null;
function jnci_UTF8Charset_$callClinit() {
    jnci_UTF8Charset_$callClinit = $rt_eraseClinit(jnci_UTF8Charset);
    jnci_UTF8Charset__clinit_();
}
function jnci_UTF8Charset__init_0() {
    var var_0 = new jnci_UTF8Charset();
    jnci_UTF8Charset__init_(var_0);
    return var_0;
}
function jnci_UTF8Charset__init_($this) {
    jnci_UTF8Charset_$callClinit();
    jnc_Charset__init_($this, $rt_s(116), $rt_createArray(jl_String, 0));
}
function jnci_UTF8Charset_newEncoder($this) {
    return jnci_UTF8Encoder__init_($this);
}
function jnci_UTF8Charset__clinit_() {
    jnci_UTF8Charset_INSTANCE = jnci_UTF8Charset__init_0();
}
var jl_ClassNotFoundException = $rt_classWithoutFields(jl_ReflectiveOperationException);
function jl_ClassNotFoundException__init_0() {
    var var_0 = new jl_ClassNotFoundException();
    jl_ClassNotFoundException__init_(var_0);
    return var_0;
}
function jl_ClassNotFoundException__init_($this) {
    jl_ReflectiveOperationException__init_0($this);
}
function gj_MouseManager$1$handleEvent$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_014 = null;
    a.$_16 = null;
    a.$_21 = null;
}
function gj_MouseManager$1$handleEvent$lambda$_1_0__init_(var_0, var_1, var_2) {
    var var_3 = new gj_MouseManager$1$handleEvent$lambda$_1_0();
    gj_MouseManager$1$handleEvent$lambda$_1_0__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gj_MouseManager$1$handleEvent$lambda$_1_0__init_0(var$0, var$1, var$2, var$3) {
    jl_Object__init_0(var$0);
    var$0.$_014 = var$1;
    var$0.$_16 = var$2;
    var$0.$_21 = var$3;
}
function gj_MouseManager$1$handleEvent$lambda$_1_0_run(var$0) {
    gj_MouseManager$1_lambda$handleEvent$0(var$0.$_014, var$0.$_16, var$0.$_21);
}
var jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException);
function jl_IllegalStateException__init_0() {
    var var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_1(var_0);
    return var_0;
}
function jl_IllegalStateException__init_(var_0) {
    var var_1 = new jl_IllegalStateException();
    jl_IllegalStateException__init_2(var_1, var_0);
    return var_1;
}
function jl_IllegalStateException__init_1($this) {
    jl_RuntimeException__init_1($this);
}
function jl_IllegalStateException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function ge_WorldEvent() {
    jl_Object.call(this);
    this.$world0 = null;
}
function ge_WorldEvent__init_(var_0) {
    var var_1 = new ge_WorldEvent();
    ge_WorldEvent__init_0(var_1, var_0);
    return var_1;
}
function ge_WorldEvent__init_0($this, $world) {
    jl_Object__init_0($this);
    $this.$world0 = $world;
}
var jn_URL = $rt_classWithoutFields();
var jn_URL_streamHandlers = null;
var jn_URL_streamHandlerFactory = null;
function jn_URL_$callClinit() {
    jn_URL_$callClinit = $rt_eraseClinit(jn_URL);
    jn_URL__clinit_();
}
function jn_URL_setURLStreamHandlerFactory($streamFactory) {
    jn_URL_$callClinit();
    ju_Objects_requireNonNull($streamFactory);
    jn_URL_streamHandlers.$clear0();
    jn_URL_streamHandlerFactory = $streamFactory;
}
function jn_URL__clinit_() {
    jn_URL_streamHandlers = ju_HashMap__init_();
}
var jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
function jl_NullPointerException__init_0(var_0) {
    var var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_2(var_1, var_0);
    return var_1;
}
function jl_NullPointerException__init_() {
    var var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_0);
    return var_0;
}
function jl_NullPointerException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function jl_NullPointerException__init_1($this) {
    jl_RuntimeException__init_1($this);
}
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
function otpp_AsyncCallbackWrapper__init_(var_0) {
    var var_1 = new otpp_AsyncCallbackWrapper();
    otpp_AsyncCallbackWrapper__init_0(var_1, var_0);
    return var_1;
}
function otpp_AsyncCallbackWrapper__init_0($this, $realAsyncCallback) {
    jl_Object__init_0($this);
    $this.$realAsyncCallback = $realAsyncCallback;
}
function otpp_AsyncCallbackWrapper_create($realAsyncCallback) {
    return otpp_AsyncCallbackWrapper__init_($realAsyncCallback);
}
function otpp_AsyncCallbackWrapper_complete($this, $result) {
    $this.$realAsyncCallback.$complete($result);
}
function otpp_AsyncCallbackWrapper_error($this, $e) {
    $this.$realAsyncCallback.$error($e);
}
var enemymenu = $rt_classWithoutFields(g_Actor);
function enemymenu__init_0() {
    var var_0 = new enemymenu();
    enemymenu__init_(var_0);
    return var_0;
}
function enemymenu__init_($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function enemymenu_act($this) {}
function jl_Object$Monitor() {
    var a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
function jl_Object$Monitor__init_() {
    var var_0 = new jl_Object$Monitor();
    jl_Object$Monitor__init_0(var_0);
    return var_0;
}
function jl_Object$Monitor__init_0($this) {
    jl_Object__init_0($this);
    $this.$owner = jl_Thread_currentThread();
}
var jl_Math = $rt_classWithoutFields();
function jl_Math__init_0() {
    var var_0 = new jl_Math();
    jl_Math__init_(var_0);
    return var_0;
}
function jl_Math__init_($this) {
    jl_Object__init_0($this);
}
function jl_Math_sin(var$1) {
    return Math.sin(var$1);
}
function jl_Math_cos(var$1) {
    return Math.cos(var$1);
}
function jl_Math_toRadians($angdeg) {
    return $angdeg * 3.141592653589793 / 180.0;
}
function jl_Math_toDegrees($angrad) {
    return $angrad * 180.0 / 3.141592653589793;
}
function jl_Math_floor(var$1) {
    return Math.floor(var$1);
}
function jl_Math_pow($x, $y) {
    return jl_Math_powImpl($x, $y);
}
function jl_Math_powImpl(var$1, var$2) {
    return Math.pow(var$1, var$2);
}
function jl_Math_atan2(var$1, var$2) {
    return Math.atan2(var$1, var$2);
}
function jl_Math_round($a) {
    return Long_fromNumber($a + jl_Math_signum($a) * 0.5);
}
function jl_Math_min($a, $b) {
    if ($a < $b)
        $b = $a;
    return $b;
}
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
function jl_Math_max0($a, $b) {
    if (Long_gt($a, $b))
        $b = $a;
    return $b;
}
function jl_Math_signum($d) {
    var var$2;
    var$2 = $rt_compare($d, 0.0);
    if (var$2 > 0)
        $d = 1.0;
    else if (var$2 < 0)
        $d = (-1.0);
    return $d;
}
function ju_HashMap$HashMapEntrySet() {
    ju_AbstractSet.call(this);
    this.$associatedMap0 = null;
}
function ju_HashMap$HashMapEntrySet__init_(var_0) {
    var var_1 = new ju_HashMap$HashMapEntrySet();
    ju_HashMap$HashMapEntrySet__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$HashMapEntrySet__init_0($this, $hm) {
    ju_AbstractSet__init_($this);
    $this.$associatedMap0 = $hm;
}
function ju_HashMap$HashMapEntrySet_size($this) {
    return $this.$associatedMap0.$elementCount0;
}
function ju_HashMap$HashMapEntrySet_iterator($this) {
    return ju_HashMap$EntryIterator__init_($this.$associatedMap0);
}
function g_ActorSet() {
    var a = this; ju_AbstractSet.call(a);
    a.$listHeadTail = null;
    a.$hashMap = null;
    a.$numActors = 0;
    a.$myHashCode = 0;
}
function g_ActorSet__init_0() {
    var var_0 = new g_ActorSet();
    g_ActorSet__init_(var_0);
    return var_0;
}
function g_ActorSet__init_($this) {
    ju_AbstractSet__init_($this);
    $this.$listHeadTail = g_ActorSet$ListNode__init_($this);
    $this.$hashMap = $rt_createArray(g_ActorSet$ListNode, 0);
    $this.$numActors = 0;
    $this.$myHashCode = 0;
}
function g_ActorSet_hashCode($this) {
    return $this.$myHashCode;
}
function g_ActorSet_add($this, $actor) {
    var $newNode, $seq, $hash, $hashHead;
    if ($this.$contains1($actor))
        return 0;
    $this.$numActors = $this.$numActors + 1 | 0;
    $newNode = g_ActorSet$ListNode__init_1($this, $actor, $this.$listHeadTail.$prev0);
    $seq = g_ActorVisitor_getSequenceNumber($actor);
    if ($this.$numActors >= (2 * $this.$hashMap.data.length | 0))
        g_ActorSet_resizeHashmap($this);
    else {
        $hash = $seq % $this.$hashMap.data.length | 0;
        $hashHead = $this.$hashMap.data[$hash];
        $this.$hashMap.data[$hash] = $newNode;
        $newNode.$setHashListHead($hashHead);
    }
    $this.$myHashCode = $this.$myHashCode + $seq | 0;
    return 1;
}
function g_ActorSet_resizeHashmap($this) {
    var $currentActor, $seq, $hash, $hashHead;
    $this.$hashMap = $rt_createArray(g_ActorSet$ListNode, $this.$numActors);
    $currentActor = $this.$listHeadTail.$next3;
    while ($currentActor !== $this.$listHeadTail) {
        $seq = g_ActorVisitor_getSequenceNumber($currentActor.$actor0);
        $hash = $seq % $this.$numActors | 0;
        $hashHead = $this.$hashMap.data[$hash];
        $this.$hashMap.data[$hash] = $currentActor;
        $currentActor.$setHashListHead($hashHead);
        $currentActor = $currentActor.$next3;
    }
}
function g_ActorSet_contains($this, $actor) {
    return g_ActorSet_getActorNode($this, $actor) === null ? 0 : 1;
}
function g_ActorSet_contains0($this, $o) {
    var $a;
    if (!($o instanceof g_Actor))
        return 0;
    $a = $o;
    return $this.$contains1($a);
}
function g_ActorSet_getActorNode($this, $actor) {
    var $seq, $hash, $hashHead, $curNode;
    if (!$this.$hashMap.data.length)
        return null;
    $seq = g_ActorVisitor_getSequenceNumber($actor);
    $hash = $seq % $this.$hashMap.data.length | 0;
    $hashHead = $this.$hashMap.data[$hash];
    if ($hashHead === null)
        return null;
    if ($hashHead.$actor0 === $actor)
        return $hashHead;
    $curNode = $hashHead.$nextHash;
    while (true) {
        if ($curNode === $hashHead)
            return null;
        if ($curNode.$actor0 === $actor)
            break;
        $curNode = $curNode.$nextHash;
    }
    return $curNode;
}
function g_ActorSet_remove($this, $actor) {
    var $actorNode;
    $actorNode = g_ActorSet_getActorNode($this, $actor);
    if ($actorNode === null)
        return 0;
    g_ActorSet_remove0($this, $actorNode);
    $this.$myHashCode = $this.$myHashCode - g_ActorVisitor_getSequenceNumber($actor) | 0;
    return 1;
}
function g_ActorSet_remove0($this, $actorNode) {
    var $seq, $hash;
    $seq = g_ActorVisitor_getSequenceNumber($actorNode.$actor0);
    $hash = $seq % $this.$hashMap.data.length | 0;
    if ($this.$hashMap.data[$hash] === $actorNode) {
        $this.$hashMap.data[$hash] = $actorNode.$nextHash;
        if ($this.$hashMap.data[$hash] === $actorNode)
            $this.$hashMap.data[$hash] = null;
    }
    $actorNode.$remove();
    $this.$numActors = $this.$numActors - 1 | 0;
    if ($this.$numActors <= ($this.$hashMap.data.length / 2 | 0))
        g_ActorSet_resizeHashmap($this);
}
function g_ActorSet_size($this) {
    return $this.$numActors;
}
function g_ActorSet_iterator($this) {
    return g_ActorSet$ActorSetIterator__init_($this);
}
function g_ActorSet_access$000($x0) {
    return $x0.$listHeadTail;
}
function smily() {
    var a = this; g_Actor.call(a);
    a.$up = 0;
    a.$down = 0;
    a.$left = 0;
    a.$right = 0;
    a.$vsp = 0;
    a.$hsp = 0;
    a.$speed0 = 0;
    a.$score = 0;
}
function smily__init_0() {
    var var_0 = new smily();
    smily__init_(var_0);
    return var_0;
}
function smily__init_($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$up = 0;
        $this.$down = 0;
        $this.$left = 0;
        $this.$right = 0;
        $this.$vsp = 0;
        $this.$hsp = 0;
        $this.$speed0 = 5;
        $this.$score = 0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function smily_act($this) {
    var $world2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$world2 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$calculate_movement();
        $this.$setLocation($this.$getX() + $rt_imul($this.$hsp, $this.$speed0) | 0, $this.$getY() + $rt_imul($this.$vsp, $this.$speed0) | 0);
        if ($this.$isTouching($rt_cls(colectble))) {
            ($this.$getWorld()).$removeObject($this.$getOneIntersectingObject0($rt_cls(colectble)));
            $this.$score = $this.$score + 1 | 0;
        }
        if ($this.$isTouching($rt_cls(enemy))) {
            $world2 = new loose;
            $ptr = 1;
            continue main;
        }
        if ($this.$score != 8)
            return;
        $world2 = new win;
        $ptr = 2;
        continue main;
    case 1:
        loose__init_0($world2);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setWorld($world2);
        if ($this.$score != 8)
            return;
        $world2 = new win;
        $ptr = 2;
    case 2:
        win__init_($world2);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setWorld($world2);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $world2, $ptr);
}
function smily_calculate_movement($this) {
    if (!g_Greenfoot_isKeyDown($rt_s(66)))
        $this.$right = 0;
    else
        $this.$right = 1;
    if (!g_Greenfoot_isKeyDown($rt_s(62)))
        $this.$left = 0;
    else
        $this.$left = 1;
    if (!g_Greenfoot_isKeyDown($rt_s(64)))
        $this.$up = 0;
    else
        $this.$up = 1;
    if (!g_Greenfoot_isKeyDown($rt_s(68)))
        $this.$down = 0;
    else
        $this.$down = 1;
    if (!g_Greenfoot_isKeyDown($rt_s(100)))
        $this.$speed0 = 5;
    else
        $this.$speed0 = 7;
    $this.$hsp = $this.$right - $this.$left | 0;
    $this.$vsp = $this.$down - $this.$up | 0;
}
var g_WorldVisitor = $rt_classWithoutFields();
function g_WorldVisitor__init_0() {
    var var_0 = new g_WorldVisitor();
    g_WorldVisitor__init_(var_0);
    return var_0;
}
function g_WorldVisitor__init_($this) {
    jl_Object__init_0($this);
}
function g_WorldVisitor_getWidthInPixels($w) {
    return $w.$getWidthInPixels();
}
function g_WorldVisitor_getHeightInPixels($w) {
    return $w.$getHeightInPixels();
}
function g_WorldVisitor_getCellSize($w) {
    return $w.$cellSize;
}
function g_WorldVisitor_getObjectsAtPixel($w, $x, $y) {
    return $w.$getObjectsAtPixel0($x, $y);
}
function g_WorldVisitor_startSequence($w) {
    $w.$startSequence();
}
function g_WorldVisitor_toCellFloor($world, $x) {
    return $world.$toCellFloor0($x);
}
function g_WorldVisitor_getObjectsListInPaintOrder($world) {
    return $world.$getObjectsListInPaintOrder();
}
function g_WorldVisitor_getObjectsListInActOrder($world) {
    return $world.$getObjectsListInActOrder0();
}
function g_WorldVisitor_getTextLabels($world) {
    return $world.$textLabels;
}
var MyWorld = $rt_classWithoutFields(g_World);
function MyWorld__init_0() {
    var var_0 = new MyWorld();
    MyWorld__init_(var_0);
    return var_0;
}
function MyWorld__init_($this) {
    var var$1, var$2, var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = 600;
        var$2 = 400;
        var$3 = 1;
        var$4 = 0;
        $ptr = 1;
    case 1:
        g_World__init_0($this, var$1, var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        $ptr = 2;
    case 2:
        MyWorld_prepare($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, var$4, $ptr);
}
function MyWorld_act($this) {
    var $world1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$world1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!g_Greenfoot_isKeyDown($rt_s(28)))
            return;
        $world1 = new game;
        $ptr = 1;
    case 1:
        game__init_($world1);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setWorld($world1);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $world1, $ptr);
}
function MyWorld_prepare($this) {
    var $enemymenu, $playermenu, $wintxt, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$wintxt = $thread.pop();$playermenu = $thread.pop();$enemymenu = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $enemymenu = new enemymenu;
        $ptr = 1;
    case 1:
        enemymenu__init_($enemymenu);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($enemymenu, 485, 204);
        $enemymenu.$setLocation(71, 189);
        $playermenu = new playermenu;
        $ptr = 2;
    case 2:
        playermenu__init_($playermenu);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($playermenu, 511, 193);
        $wintxt = new wintxt;
        $ptr = 3;
    case 3:
        wintxt__init_0($wintxt);
        if ($rt_suspending()) {
            break main;
        }
        $this.$showText($rt_s(117), 300, 150);
        $this.$showText($rt_s(118), 300, 250);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $enemymenu, $playermenu, $wintxt, $ptr);
}
function gj_MouseManager$1() {
    jl_Object.call(this);
    this.$this$014 = null;
}
function gj_MouseManager$1__init_(var_0) {
    var var_1 = new gj_MouseManager$1();
    gj_MouseManager$1__init_0(var_1, var_0);
    return var_1;
}
function gj_MouseManager$1__init_0($this, $this$0) {
    $this.$this$014 = $this$0;
    jl_Object__init_0($this);
}
function gj_MouseManager$1_handleEvent($this, $e) {
    var $etype, var$3;
    $etype = $rt_str($e.type);
    $e.stopPropagation();
    $e.preventDefault();
    var$3 = jl_Thread__init_3(gj_MouseManager$1$handleEvent$lambda$_1_0__init_($this, $etype, $e));
    var$3.$start();
}
function gj_MouseManager$1_handleEvent0($this, var$1) {
    $this.$handleEvent1(var$1);
}
function gj_MouseManager$1_lambda$handleEvent$0($this, $etype, $e) {
    var var$3;
    a: {
        var$3 = (-1);
        switch ($etype.$hashCode0()) {
            case 587111926:
                if (!$etype.$equals($rt_s(50)))
                    break a;
                var$3 = 0;
                break a;
            case 1243067904:
                if (!$etype.$equals($rt_s(48)))
                    break a;
                var$3 = 1;
                break a;
            default:
        }
    }
    b: {
        switch (var$3) {
            case 0:
                break;
            case 1:
                if ($e.button)
                    break b;
                gj_MouseManager_access$102($this.$this$014, 0);
                gj_MouseManager_access$200($this.$this$014, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16);
                (otjdh_HTMLDocument_current()).removeEventListener("mousemove", otji_JS_function($this, "handleEvent"));
                (otjdh_HTMLDocument_current()).removeEventListener("mouseup", otji_JS_function($this, "handleEvent"));
                break b;
            default:
                break b;
        }
        gj_MouseManager_access$000($this.$this$014, $e.clientX, $e.clientY, 1);
    }
}
function gj_MouseManager$1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gj_JsActorDelegate() {
    var a = this; jl_Object.call(a);
    a.$props = null;
    a.$imageCache0 = null;
}
function gj_JsActorDelegate__init_(var_0) {
    var var_1 = new gj_JsActorDelegate();
    gj_JsActorDelegate__init_0(var_1, var_0);
    return var_1;
}
function gj_JsActorDelegate__init_0($this, $props) {
    jl_Object__init_0($this);
    $this.$imageCache0 = ju_HashMap__init_();
    $this.$props = $props;
}
function gj_JsActorDelegate_getImage($this, $name) {
    var $propName, $imgName, $r, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$r = $thread.pop();$imgName = $thread.pop();$propName = $thread.pop();$name = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $propName = ((((jl_StringBuilder__init_()).$append8($rt_s(119))).$append8($name)).$append8($rt_s(120))).$toString();
        $imgName = $this.$props.$getProperty($propName);
        if ($imgName === null)
            return g_GreenfootImage__init_0(10, 10);
        $r = $this.$imageCache0.$get0($imgName);
        if ($r !== null)
            return $r;
        $r = new g_GreenfootImage;
        $ptr = 1;
    case 1:
        g_GreenfootImage__init_($r, $imgName);
        if ($rt_suspending()) {
            break main;
        }
        $this.$imageCache0.$put($imgName, $r);
        return $r;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $name, $propName, $imgName, $r, $ptr);
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0() {
    jl_Object.call(this);
    this.$_015 = null;
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_(var_0) {
    var var_1 = new jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0();
    jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_015 = var$1;
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0_run(var$0) {
    jl_Object$NotifyListenerImpl_lambda$onTimer$1(var$0.$_015);
}
function g_TreeActorSet() {
    var a = this; ju_AbstractSet.call(a);
    a.$subSets = null;
    a.$generalSet = null;
    a.$classSets = null;
}
function g_TreeActorSet__init_() {
    var var_0 = new g_TreeActorSet();
    g_TreeActorSet__init_0(var_0);
    return var_0;
}
function g_TreeActorSet__init_0($this) {
    ju_AbstractSet__init_($this);
    $this.$subSets = ju_LinkedList__init_();
    $this.$generalSet = g_ActorSet__init_0();
    $this.$subSets.$add($this.$generalSet);
    $this.$classSets = ju_HashMap__init_();
}
function g_TreeActorSet_iterator($this) {
    return g_TreeActorSet$TasIterator__init_($this);
}
function g_TreeActorSet_size($this) {
    var $size, $i;
    $size = 0;
    $i = $this.$subSets.$iterator();
    while ($i.$hasNext()) {
        $size = $size + ($i.$next1()).$size0() | 0;
    }
    return $size;
}
function g_TreeActorSet_add($this, $o) {
    if ($o !== null)
        return (g_TreeActorSet_setForActor($this, $o)).$add0($o);
    $rt_throw(jl_UnsupportedOperationException__init_1($rt_s(121)));
}
function g_TreeActorSet_remove($this, $o) {
    return (g_TreeActorSet_setForActor($this, $o)).$remove1($o);
}
function g_TreeActorSet_setForActor($this, $o) {
    var $oClass;
    $oClass = jl_Object_getClass($o);
    return g_TreeActorSet_setForClass($this, $oClass);
}
function g_TreeActorSet_setForClass($this, $oClass) {
    var $set;
    $set = $this.$classSets.$get0($oClass);
    while ($set === null && $oClass !== $rt_cls(jl_Object)) {
        $oClass = $oClass.$getSuperclass();
        $set = $this.$classSets.$get0($oClass);
    }
    if ($set === null)
        $set = $this.$generalSet;
    return $set;
}
function g_TreeActorSet_access$000($x0) {
    return $x0.$subSets;
}
var colectble = $rt_classWithoutFields(g_Actor);
function colectble__init_0() {
    var var_0 = new colectble();
    colectble__init_(var_0);
    return var_0;
}
function colectble__init_($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function colectble_act($this) {}
var game = $rt_classWithoutFields(g_World);
function game__init_0() {
    var var_0 = new game();
    game__init_(var_0);
    return var_0;
}
function game__init_($this) {
    var var$1, var$2, var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = 600;
        var$2 = 400;
        var$3 = 1;
        var$4 = 0;
        $ptr = 1;
    case 1:
        g_World__init_0($this, var$1, var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        $ptr = 2;
    case 2:
        game_prepare($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, var$4, $ptr);
}
function game_prepare($this) {
    var $smily, $colectble, $enemy, $colectble2, $colectble3, $colectble4, $colectble5, $colectble6, $colectble7, $colectble8, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$colectble8 = $thread.pop();$colectble7 = $thread.pop();$colectble6 = $thread.pop();$colectble5 = $thread.pop();$colectble4 = $thread.pop();$colectble3 = $thread.pop();$colectble2 = $thread.pop();$enemy = $thread.pop();$colectble = $thread.pop();$smily = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $smily = new smily;
        $ptr = 1;
    case 1:
        smily__init_($smily);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($smily, 578, 179);
        $smily.$setLocation(134, 120);
        $smily.$setLocation(124, 105);
        $smily.$setLocation(81, 73);
        $smily.$setLocation(72, 55);
        $colectble = new colectble;
        $ptr = 2;
    case 2:
        colectble__init_($colectble);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble, 278, 275);
        $enemy = new enemy;
        $ptr = 3;
    case 3:
        enemy__init_0($enemy);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($enemy, 540, 351);
        $colectble2 = new colectble;
        $ptr = 4;
    case 4:
        colectble__init_($colectble2);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble2, 509, 47);
        $colectble3 = new colectble;
        $ptr = 5;
    case 5:
        colectble__init_($colectble3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble3, 68, 260);
        $colectble4 = new colectble;
        $ptr = 6;
    case 6:
        colectble__init_($colectble4);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble4, 313, 139);
        $colectble5 = new colectble;
        $ptr = 7;
    case 7:
        colectble__init_($colectble5);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble5, 395, 347);
        $colectble6 = new colectble;
        $ptr = 8;
    case 8:
        colectble__init_($colectble6);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble6, 501, 187);
        $colectble7 = new colectble;
        $ptr = 9;
    case 9:
        colectble__init_($colectble7);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble7, 137, 351);
        $colectble8 = new colectble;
        $ptr = 10;
    case 10:
        colectble__init_($colectble8);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addObject0($colectble8, 163, 134);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $smily, $colectble, $enemy, $colectble2, $colectble3, $colectble4, $colectble5, $colectble6, $colectble7, $colectble8, $ptr);
}
var jn_BufferOverflowException = $rt_classWithoutFields(jl_RuntimeException);
function jn_BufferOverflowException__init_() {
    var var_0 = new jn_BufferOverflowException();
    jn_BufferOverflowException__init_0(var_0);
    return var_0;
}
function jn_BufferOverflowException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function ju_HashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount0 = 0;
    a.$elementData = null;
    a.$modCount1 = 0;
    a.$loadFactor0 = 0.0;
    a.$threshold0 = 0;
}
function ju_HashMap__init_() {
    var var_0 = new ju_HashMap();
    ju_HashMap__init_1(var_0);
    return var_0;
}
function ju_HashMap__init_0(var_0) {
    var var_1 = new ju_HashMap();
    ju_HashMap__init_2(var_1, var_0);
    return var_1;
}
function ju_HashMap__init_3(var_0, var_1) {
    var var_2 = new ju_HashMap();
    ju_HashMap__init_4(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap_newElementArray($this, $s) {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
}
function ju_HashMap__init_1($this) {
    ju_HashMap__init_2($this, 16);
}
function ju_HashMap__init_2($this, $capacity) {
    ju_HashMap__init_4($this, $capacity, 0.75);
}
function ju_HashMap_calculateCapacity($x) {
    var var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
}
function ju_HashMap__init_4($this, $capacity, $loadFactor) {
    var var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount0 = 0;
        $this.$elementData = $this.$newElementArray0(var$3);
        $this.$loadFactor0 = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
}
function ju_HashMap_clear($this) {
    if ($this.$elementCount0 > 0) {
        $this.$elementCount0 = 0;
        ju_Arrays_fill0($this.$elementData, null);
        $this.$modCount1 = $this.$modCount1 + 1 | 0;
    }
}
function ju_HashMap_computeThreshold($this) {
    $this.$threshold0 = $this.$elementData.data.length * $this.$loadFactor0 | 0;
}
function ju_HashMap_containsKey($this, $key) {
    var $m;
    $m = ju_HashMap_getEntry($this, $key);
    return $m === null ? 0 : 1;
}
function ju_HashMap_entrySet($this) {
    return ju_HashMap$HashMapEntrySet__init_($this);
}
function ju_HashMap_get($this, $key) {
    var $m;
    $m = ju_HashMap_getEntry($this, $key);
    if ($m === null)
        return null;
    return $m.$value0;
}
function ju_HashMap_getEntry($this, $key) {
    var $m, $hash, $index;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = ju_HashMap_computeHashCode($key);
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    return $m;
}
function ju_HashMap_findNonNullKeyEntry($this, $key, $index, $keyHash) {
    var $m, var$5;
    $m = $this.$elementData.data[$index];
    while ($m !== null) {
        if ($m.$origKeyHash == $keyHash) {
            var$5 = $m.$key;
            if (ju_HashMap_areEqualKeys($key, var$5))
                break;
        }
        $m = $m.$next2;
    }
    return $m;
}
function ju_HashMap_findNullKeyEntry($this) {
    var $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next2;
    }
    return $m;
}
function ju_HashMap_isEmpty($this) {
    return $this.$elementCount0 ? 0 : 1;
}
function ju_HashMap_keySet($this) {
    if ($this.$cachedKeySet === null)
        $this.$cachedKeySet = ju_HashMap$1__init_($this);
    return $this.$cachedKeySet;
}
function ju_HashMap_put($this, $key, $value) {
    return $this.$putImpl($key, $value);
}
function ju_HashMap_putImpl($this, $key, $value) {
    var $entry, var$4, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = $this.$createHashedEntry(null, 0, 0);
            var$4 = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = var$4;
            if (var$4 > $this.$threshold0)
                $this.$rehash();
        }
    } else {
        $hash = ju_HashMap_computeHashCode($key);
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = $this.$createHashedEntry($key, $index, $hash);
            var$4 = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = var$4;
            if (var$4 > $this.$threshold0)
                $this.$rehash();
        }
    }
    $result = $entry.$value0;
    $entry.$value0 = $value;
    return $result;
}
function ju_HashMap_createHashedEntry($this, $key, $index, $hash) {
    var $entry;
    $entry = ju_HashMap$HashEntry__init_($key, $hash);
    $entry.$next2 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
}
function ju_HashMap_rehash($this, $capacity) {
    var $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray0($length);
    $i = 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next2;
            $entry.$next2 = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
}
function ju_HashMap_rehash0($this) {
    $this.$rehash0($this.$elementData.data.length);
}
function ju_HashMap_remove($this, $key) {
    var $entry;
    $entry = ju_HashMap_removeEntry($this, $key);
    if ($entry === null)
        return null;
    return $entry.$value0;
}
function ju_HashMap_removeEntry($this, $key) {
    var $index, $last, $entry, $entry_0, $hash;
    a: {
        $index = 0;
        $last = null;
        if ($key === null) {
            $entry = $this.$elementData.data[0];
            while ($entry !== null) {
                if ($entry.$key === null)
                    break a;
                $entry_0 = $entry.$next2;
                $last = $entry;
                $entry = $entry_0;
            }
        } else {
            $hash = ju_HashMap_computeHashCode($key);
            $index = $hash & ($this.$elementData.data.length - 1 | 0);
            $entry = $this.$elementData.data[$index];
            while ($entry !== null && !($entry.$origKeyHash == $hash && ju_HashMap_areEqualKeys($key, $entry.$key))) {
                $entry_0 = $entry.$next2;
                $last = $entry;
                $entry = $entry_0;
            }
        }
    }
    if ($entry === null)
        return null;
    if ($last !== null)
        $last.$next2 = $entry.$next2;
    else
        $this.$elementData.data[$index] = $entry.$next2;
    $this.$modCount1 = $this.$modCount1 + 1 | 0;
    $this.$elementCount0 = $this.$elementCount0 - 1 | 0;
    return $entry;
}
function ju_HashMap_size($this) {
    return $this.$elementCount0;
}
function ju_HashMap_computeHashCode($key) {
    return $key.$hashCode0();
}
function ju_HashMap_areEqualKeys($key1, $key2) {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_016 = null;
    a.$_17 = null;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0__init_(var_0, var_1) {
    var var_2 = new g_GreenfootImage$1$handleEvent$lambda$_1_0();
    g_GreenfootImage$1$handleEvent$lambda$_1_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_016 = var$1;
    var$0.$_17 = var$2;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0_run(var$0) {
    g_GreenfootImage$1_lambda$handleEvent$0(var$0.$_016, var$0.$_17);
}
function jl_Thread$start$lambda$_4_0() {
    jl_Object.call(this);
    this.$_017 = null;
}
function jl_Thread$start$lambda$_4_0__init_(var_0) {
    var var_1 = new jl_Thread$start$lambda$_4_0();
    jl_Thread$start$lambda$_4_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Thread$start$lambda$_4_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_017 = var$1;
}
function jl_Thread$start$lambda$_4_0_run(var$0) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = var$0.$_017;
        $ptr = 1;
    case 1:
        jl_Thread_runThread(var$1);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$0, var$1, $ptr);
}
function otciu_UnicodeHelper$Range() {
    var a = this; jl_Object.call(a);
    a.$start1 = 0;
    a.$end = 0;
    a.$data0 = null;
}
function otciu_UnicodeHelper$Range__init_(var_0, var_1, var_2) {
    var var_3 = new otciu_UnicodeHelper$Range();
    otciu_UnicodeHelper$Range__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function otciu_UnicodeHelper$Range__init_0($this, $start, $end, $data) {
    jl_Object__init_0($this);
    $this.$start1 = $start;
    $this.$end = $end;
    $this.$data0 = $data;
}
function jnc_CoderResult() {
    var a = this; jl_Object.call(a);
    a.$kind = 0;
    a.$length1 = 0;
}
var jnc_CoderResult_UNDERFLOW = null;
var jnc_CoderResult_OVERFLOW = null;
function jnc_CoderResult_$callClinit() {
    jnc_CoderResult_$callClinit = $rt_eraseClinit(jnc_CoderResult);
    jnc_CoderResult__clinit_();
}
function jnc_CoderResult__init_(var_0, var_1) {
    var var_2 = new jnc_CoderResult();
    jnc_CoderResult__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnc_CoderResult__init_0($this, $kind, $length) {
    jnc_CoderResult_$callClinit();
    jl_Object__init_0($this);
    $this.$kind = $kind;
    $this.$length1 = $length;
}
function jnc_CoderResult_isUnderflow($this) {
    return $this.$kind ? 0 : 1;
}
function jnc_CoderResult_isOverflow($this) {
    return $this.$kind != 1 ? 0 : 1;
}
function jnc_CoderResult_isError($this) {
    return !$this.$isMalformed() && !$this.$isUnmappable() ? 0 : 1;
}
function jnc_CoderResult_isMalformed($this) {
    return $this.$kind != 2 ? 0 : 1;
}
function jnc_CoderResult_isUnmappable($this) {
    return $this.$kind != 3 ? 0 : 1;
}
function jnc_CoderResult_length($this) {
    if ($this.$isError())
        return $this.$length1;
    $rt_throw(jl_UnsupportedOperationException__init_());
}
function jnc_CoderResult_malformedForLength($length) {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult__init_(2, $length);
}
function jnc_CoderResult__clinit_() {
    jnc_CoderResult_UNDERFLOW = jnc_CoderResult__init_(0, 0);
    jnc_CoderResult_OVERFLOW = jnc_CoderResult__init_(1, 0);
}
function g_MouseInfo() {
    var a = this; jl_Object.call(a);
    a.$actor1 = null;
    a.$button = 0;
    a.$x1 = 0;
    a.$y1 = 0;
    a.$clickCount = 0;
}
function g_MouseInfo__init_() {
    var var_0 = new g_MouseInfo();
    g_MouseInfo__init_0(var_0);
    return var_0;
}
function g_MouseInfo__init_0($this) {
    jl_Object__init_0($this);
}
function g_MouseInfo_getX($this) {
    return $this.$x1;
}
function g_MouseInfo_getY($this) {
    return $this.$y1;
}
function g_MouseInfo_getActor($this) {
    return $this.$actor1;
}
function g_MouseInfo_getButton($this) {
    return $this.$button;
}
function g_MouseInfo_setButton($this, $button) {
    $this.$button = $button;
}
function g_MouseInfo_setLoc($this, $x, $y) {
    $this.$x1 = $x;
    $this.$y1 = $y;
}
function g_MouseInfo_setActor($this, $actor) {
    $this.$actor1 = $actor;
}
function g_MouseInfo_setClickCount($this, $clickCount) {
    $this.$clickCount = $clickCount;
}
var otcit_DoubleAnalyzer = $rt_classWithoutFields();
var otcit_DoubleAnalyzer_mantissa10Table = null;
var otcit_DoubleAnalyzer_exp10Table = null;
function otcit_DoubleAnalyzer_$callClinit() {
    otcit_DoubleAnalyzer_$callClinit = $rt_eraseClinit(otcit_DoubleAnalyzer);
    otcit_DoubleAnalyzer__clinit_();
}
function otcit_DoubleAnalyzer__init_0() {
    var var_0 = new otcit_DoubleAnalyzer();
    otcit_DoubleAnalyzer__init_(var_0);
    return var_0;
}
function otcit_DoubleAnalyzer__init_($this) {
    otcit_DoubleAnalyzer_$callClinit();
    jl_Object__init_0($this);
}
function otcit_DoubleAnalyzer_analyze($d, $result) {
    var $bits, $mantissa, $exponent, $errorShift, var$7, $decExponent, $binExponentCorrection, $mantissaShift, $decMantissa, var$12, $error, $upError, $downError, $lowerPos, $upperPos;
    otcit_DoubleAnalyzer_$callClinit();
    $bits = $rt_doubleToLongBits($d);
    $result.$sign = Long_eq(Long_and($bits, Long_create(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $mantissa = Long_and($bits, Long_create(4294967295, 1048575));
    $exponent = Long_lo(Long_shr($bits, 52)) & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    $errorShift = 0;
    if ($exponent)
        var$7 = Long_or($mantissa, Long_create(0, 1048576));
    else {
        var$7 = Long_shl($mantissa, 1);
        while (Long_eq(Long_and(var$7, Long_create(0, 1048576)), Long_ZERO)) {
            var$7 = Long_shl(var$7, 1);
            $exponent = $exponent + (-1) | 0;
            $errorShift = $errorShift + 1 | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_DoubleAnalyzer_exp10Table, $exponent);
    if ($decExponent < 0)
        $decExponent = ( -$decExponent | 0) - 2 | 0;
    $binExponentCorrection = $exponent - otcit_DoubleAnalyzer_exp10Table.data[$decExponent] | 0;
    $mantissaShift = 12 + $binExponentCorrection | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$7, otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], $mantissaShift);
    if (Long_ge($decMantissa, Long_create(2808348672, 232830643))) {
        $decExponent = $decExponent + 1 | 0;
        var$12 = $exponent - otcit_DoubleAnalyzer_exp10Table.data[$decExponent] | 0;
        $mantissaShift = 12 + var$12 | 0;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$7, otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], $mantissaShift);
    }
    $error = Long_shru(otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], (63 - $mantissaShift | 0) - $errorShift | 0);
    $upError = Long_shr(Long_add($error, Long_fromInt(1)), 1);
    $downError = Long_shr($error, 1);
    if (Long_eq(var$7, Long_create(0, 1048576)))
        $downError = Long_shr($downError, 2);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistanceToZero($decMantissa, $downError);
    $upperPos = otcit_DoubleAnalyzer_findUpperDistanceToZero($decMantissa, $upError);
    var$12 = Long_compare($lowerPos, $upperPos);
    var$7 = var$12 > 0 ? Long_mul(Long_div($decMantissa, $lowerPos), $lowerPos) : var$12 < 0 ? Long_add(Long_mul(Long_div($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(Long_div(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (Long_ge(var$7, Long_create(2808348672, 232830643))) {
        $decExponent = $decExponent + 1 | 0;
        var$7 = Long_div(var$7, Long_fromInt(10));
    } else if (Long_lt(var$7, Long_create(1569325056, 23283064))) {
        $decExponent = $decExponent + (-1) | 0;
        var$7 = Long_mul(var$7, Long_fromInt(10));
    }
    $result.$mantissa = var$7;
    $result.$exponent = $decExponent - 330 | 0;
}
function otcit_DoubleAnalyzer_findLowerDistanceToZero($mantissa, $error) {
    var $pos, $mantissaRight;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(10);
    while (Long_le($pos, $error)) {
        $pos = Long_mul($pos, Long_fromInt(10));
    }
    $mantissaRight = Long_rem($mantissa, $pos);
    if (Long_ge($mantissaRight, Long_div($error, Long_fromInt(2))))
        $pos = Long_div($pos, Long_fromInt(10));
    return $pos;
}
function otcit_DoubleAnalyzer_findUpperDistanceToZero($mantissa, $error) {
    var $pos, $mantissaRight;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (Long_le($pos, $error)) {
        $pos = Long_mul($pos, Long_fromInt(10));
    }
    $mantissaRight = Long_rem($mantissa, $pos);
    if (Long_gt(Long_sub($pos, $mantissaRight), Long_div($error, Long_fromInt(2))))
        $pos = Long_div($pos, Long_fromInt(10));
    return $pos;
}
function otcit_DoubleAnalyzer_mulAndShiftRight($a, $b, $shift) {
    var $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4, $cm, $c0, $c1, $c2, $c3, $c, var$18;
    otcit_DoubleAnalyzer_$callClinit();
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    $cm = Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3));
    $c0 = Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4));
    $c1 = Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4));
    $c2 = Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4));
    $c3 = Long_mul($b4, $a4);
    $c = Long_add(Long_add(Long_shl($c3, 32 + $shift | 0), Long_shl($c2, 16 + $shift | 0)), Long_shl($c1, $shift));
    var$18 = $shift > 16 ? Long_add($c, Long_shl($c0, $shift - 16 | 0)) : Long_add($c, Long_shru($c0, 16 - $shift | 0));
    var$18 = Long_add(var$18, Long_shru($cm, 32 - $shift | 0));
    return var$18;
}
function otcit_DoubleAnalyzer__clinit_() {
    var $decimalMantissaOne, $exponent, $i, var$4, var$5, var$6, var$7, $maxMantissa, var$9, $shift, $shiftedOffPart;
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArray(660);
    otcit_DoubleAnalyzer_exp10Table = $rt_createIntArray(660);
    $decimalMantissaOne = Long_create(991952896, 1862645149);
    $exponent = 1023;
    $i = 0;
    var$4 = $decimalMantissaOne;
    while ($i < 330) {
        var$5 = otcit_DoubleAnalyzer_mantissa10Table.data;
        var$6 = $i + 330 | 0;
        var$5[var$6] = jl_Long_divideUnsigned(var$4, Long_fromInt(80));
        otcit_DoubleAnalyzer_exp10Table.data[var$6] = $exponent;
        var$4 = jl_Long_divideUnsigned(var$4, Long_fromInt(10));
        var$7 = jl_Long_remainderUnsigned(var$4, Long_fromInt(10));
        while (Long_le(var$4, $decimalMantissaOne) && Long_eq(Long_and(var$4, Long_create(0, 2147483648)), Long_ZERO)) {
            var$4 = Long_shl(var$4, 1);
            $exponent = $exponent + 1 | 0;
            var$7 = Long_shl(var$7, 1);
        }
        var$4 = Long_add(var$4, Long_div(var$7, Long_fromInt(10)));
        $i = $i + 1 | 0;
    }
    $maxMantissa = Long_create(3435973836, 214748364);
    var$9 = 1023;
    $i = 0;
    while ($i < 330) {
        $shift = 0;
        var$4 = $decimalMantissaOne;
        while (Long_gt(var$4, $maxMantissa)) {
            var$4 = Long_shr(var$4, 1);
            $shift = $shift + 1 | 0;
            var$9 = var$9 + (-1) | 0;
        }
        var$7 = Long_mul(var$4, Long_fromInt(10));
        if ($shift <= 0)
            $decimalMantissaOne = var$7;
        else {
            $shiftedOffPart = Long_and($decimalMantissaOne, Long_fromInt((1 << $shift) - 1 | 0));
            $decimalMantissaOne = Long_add(var$7, Long_shr(Long_mul($shiftedOffPart, Long_fromInt(10)), $shift));
        }
        var$5 = otcit_DoubleAnalyzer_mantissa10Table.data;
        var$6 = (330 - $i | 0) - 1 | 0;
        var$5[var$6] = jl_Long_divideUnsigned($decimalMantissaOne, Long_fromInt(80));
        otcit_DoubleAnalyzer_exp10Table.data[var$6] = var$9;
        $i = $i + 1 | 0;
    }
}
var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
function jl_NoClassDefFoundError__init_0() {
    var var_0 = new jl_NoClassDefFoundError();
    jl_NoClassDefFoundError__init_(var_0);
    return var_0;
}
function jl_NoClassDefFoundError__init_($this) {
    jl_LinkageError__init_0($this);
}
var win = $rt_classWithoutFields(g_World);
function win__init_0() {
    var var_0 = new win();
    win__init_(var_0);
    return var_0;
}
function win__init_($this) {
    var var$1, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = 600;
        var$2 = 400;
        var$3 = 1;
        $ptr = 1;
    case 1:
        g_World__init_($this, var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$showText($rt_s(122), 300, 150);
        $this.$showText($rt_s(123), 300, 200);
        $this.$showText($rt_s(27), 300, 250);
        $this.$showText($rt_s(124), 300, 300);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, $ptr);
}
function win_act($this) {
    var $world4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$world4 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (g_Greenfoot_isKeyDown($rt_s(28))) {
            $world4 = new game;
            $ptr = 1;
            continue main;
        }
        if (!g_Greenfoot_isKeyDown($rt_s(29)))
            return;
        $world4 = new MyWorld;
        $ptr = 2;
        continue main;
    case 1:
        game__init_($world4);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setWorld($world4);
        if (!g_Greenfoot_isKeyDown($rt_s(29)))
            return;
        $world4 = new MyWorld;
        $ptr = 2;
    case 2:
        MyWorld__init_($world4);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setWorld($world4);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $world4, $ptr);
}
function gj_Client() {
    var a = this; jl_Object.call(a);
    a.$mainClassName = null;
    a.$isPaused = 0;
    a.$scenarioCanvas = null;
}
var gj_Client_blobCache = null;
function gj_Client_$callClinit() {
    gj_Client_$callClinit = $rt_eraseClinit(gj_Client);
    gj_Client__clinit_();
}
function gj_Client__init_0() {
    var var_0 = new gj_Client();
    gj_Client__init_(var_0);
    return var_0;
}
function gj_Client_main($args) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$args = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        var$2 = new gj_Client;
        $ptr = 1;
    case 1:
        gj_Client__init_(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($args, var$2, $ptr);
}
function gj_Client__init_($this) {
    var $document, var$2, var$3, var$4, var$5, var$6, $standalonePropBytes, $standaloneProps, $doLockStr, $projectPropBytes, $projectProps, $simulation, $simSpeedStr, $simSpeed, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$simSpeed = $thread.pop();$simSpeedStr = $thread.pop();$simulation = $thread.pop();$projectProps = $thread.pop();$projectPropBytes = $thread.pop();$doLockStr = $thread.pop();$standaloneProps = $thread.pop();$standalonePropBytes = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$document = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        jl_Object__init_0($this);
        $this.$isPaused = 1;
        gj_Client_setupURLFactory($this);
        $document = otjdh_HTMLDocument_current();
        gu_GreenfootUtil_initialise(gj_GreenfootUtilJsDelegate__init_());
        $this.$scenarioCanvas = $document.getElementById("scenarioCanvas");
        gc_WorldHandler_initialise($this.$scenarioCanvas);
        $ptr = 1;
    case 1:
        g_ActorVisitor_initialise();
        if ($rt_suspending()) {
            break main;
        }
        gj_Client_canvasMessage($rt_s(125));
        var$2 = $document.getElementById("resetButton");
        var$3 = $document.getElementById("playButton");
        var$4 = $document.getElementById("speedSlider");
        otjde_MouseEventTarget_listenClick$static(var$2, gj_Client$_init_$lambda$_1_0__init_($this));
        var$5 = gj_Client$_init_$lambda$_1_1__init_(var$4);
        var$4.addEventListener("input", otji_JS_function(var$5, "handleEvent"));
        var$5 = gj_Client$_init_$lambda$_1_2__init_(var$4);
        var$4.addEventListener("change", otji_JS_function(var$5, "handleEvent"));
        otjde_MouseEventTarget_listenClick$static(var$3, gj_Client$_init_$lambda$_1_3__init_($this));
        otc_ResourceSource_setSource(gj_Client$1__init_($this));
        try {
            var$6 = $rt_s(126);
            $ptr = 2;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
            } else {
                throw $$e;
            }
        }
        gj_Client_canvasMessage($rt_s(127));
        return;
    case 2:
        try {
            $tmp = gj_Client_getResourceBytes(var$6);
            if ($rt_suspending()) {
                break main;
            }
            $standalonePropBytes = $tmp;
            if ($standalonePropBytes === null)
                $rt_throw(ji_IOException__init_($rt_s(128)));
            $standaloneProps = ju_Properties__init_0();
            $standaloneProps.$load(ji_ByteArrayInputStream__init_1($standalonePropBytes));
            $this.$mainClassName = $standaloneProps.$getProperty($rt_s(129));
            (jl_System_out()).$println1((((jl_StringBuilder__init_()).$append8($rt_s(130))).$append8($this.$mainClassName)).$toString());
            $doLockStr = $standaloneProps.$getProperty($rt_s(131));
            if ($rt_s(132).$equals($doLockStr))
                var$4.style.setProperty("display", "none");
            var$6 = $rt_s(133);
            $ptr = 3;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
            } else {
                throw $$e;
            }
        }
        gj_Client_canvasMessage($rt_s(127));
        return;
    case 3:
        try {
            $tmp = gj_Client_getResourceBytes(var$6);
            if ($rt_suspending()) {
                break main;
            }
            $projectPropBytes = $tmp;
            if ($projectPropBytes === null)
                $rt_throw(ji_IOException__init_($rt_s(134)));
            a: {
                $projectProps = ju_Properties__init_0();
                $projectProps.$load(ji_ByteArrayInputStream__init_1($projectPropBytes));
                g_ActorVisitor_setDelegate(gj_JsActorDelegate__init_($projectProps));
                gc_Simulation_initialize(gj_Client$2__init_($this));
                $simulation = gc_Simulation_getInstance();
                $simulation.$attachWorldHandler(gc_WorldHandler_getInstance());
                $simulation.$addSimulationListener(gj_Client$3__init_($this, var$4, $simulation, var$2, var$3));
                $simSpeedStr = $projectProps.$getProperty($rt_s(135));
                if ($simSpeedStr !== null)
                    try {
                        $simSpeed = jl_Integer_parseInt0($simSpeedStr);
                        $simulation.$setSpeed($simSpeed);
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_NumberFormatException) {
                        } else {
                            throw $$e;
                        }
                    }
            }
            $ptr = 4;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
            } else {
                throw $$e;
            }
        }
        gj_Client_canvasMessage($rt_s(127));
        return;
    case 4:
        b: {
            try {
                gj_Client_doReset($this);
                if ($rt_suspending()) {
                    break main;
                }
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof ji_IOException) {
                } else {
                    throw $$e;
                }
            }
            gj_Client_canvasMessage($rt_s(127));
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $document, var$2, var$3, var$4, var$5, var$6, $standalonePropBytes, $standaloneProps, $doLockStr, $projectPropBytes, $projectProps, $simulation, $simSpeedStr, $simSpeed, $ptr);
}
function gj_Client_doReset($this) {
    var var$1, $t, $wc, $w, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$w = $thread.pop();$wc = $thread.pop();$t = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        a: {
            b: {
                try {
                    (gc_WorldHandler_getInstance()).$discardWorld();
                    var$1 = $this.$mainClassName;
                    $ptr = 1;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_ClassNotFoundException) {
                        break b;
                    } else if ($$je instanceof jl_InstantiationException) {
                    } else if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                        var$1 = (((jl_StringBuilder__init_()).$append8($rt_s(136))).$append8((jl_Object_getClass($t)).$getName())).$append8($rt_s(137));
                        var$1 = (var$1.$append8($t.$getMessage())).$toString();
                        gj_Client_canvasMessage(var$1);
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                gj_Client_canvasMessage($rt_s(138));
                break a;
            }
            gj_Client_canvasMessage(((((jl_StringBuilder__init_()).$append8($rt_s(139))).$append8($this.$mainClassName)).$append8($rt_s(140))).$toString());
        }
        return;
    case 1:
        a: {
            b: {
                try {
                    $tmp = jl_Class_forName(var$1);
                    if ($rt_suspending()) {
                        break main;
                    }
                    $wc = $tmp;
                    $ptr = 2;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_ClassNotFoundException) {
                        break b;
                    } else if ($$je instanceof jl_InstantiationException) {
                    } else if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                        var$1 = (((jl_StringBuilder__init_()).$append8($rt_s(136))).$append8((jl_Object_getClass($t)).$getName())).$append8($rt_s(137));
                        var$1 = (var$1.$append8($t.$getMessage())).$toString();
                        gj_Client_canvasMessage(var$1);
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                gj_Client_canvasMessage($rt_s(138));
                break a;
            }
            gj_Client_canvasMessage(((((jl_StringBuilder__init_()).$append8($rt_s(139))).$append8($this.$mainClassName)).$append8($rt_s(140))).$toString());
        }
        return;
    case 2:
        a: {
            b: {
                try {
                    $tmp = $wc.$newInstance1();
                    if ($rt_suspending()) {
                        break main;
                    }
                    var$1 = $tmp;
                    $w = var$1;
                    (gc_WorldHandler_getInstance()).$setWorld($w);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_ClassNotFoundException) {
                        break b;
                    } else if ($$je instanceof jl_InstantiationException) {
                    } else if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                        var$1 = (((jl_StringBuilder__init_()).$append8($rt_s(136))).$append8((jl_Object_getClass($t)).$getName())).$append8($rt_s(137));
                        var$1 = (var$1.$append8($t.$getMessage())).$toString();
                        gj_Client_canvasMessage(var$1);
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                gj_Client_canvasMessage($rt_s(138));
                break a;
            }
            gj_Client_canvasMessage(((((jl_StringBuilder__init_()).$append8($rt_s(139))).$append8($this.$mainClassName)).$append8($rt_s(140))).$toString());
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $t, $wc, $w, $ptr);
}
function gj_Client_canvasMessage($s) {
    var $document, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    gj_Client_$callClinit();
    $document = otjdh_HTMLDocument_current();
    var$3 = $document.getElementById("scenarioCanvas");
    var$4 = var$3.getContext("2d");
    var$5 = "#000000";
    var$4.fillStyle = var$5;
    var$6 = var$3.width;
    var$7 = var$3.height;
    var$4.fillRect(0.0, 0.0, var$6, var$7);
    var$5 = "2em Sans";
    var$4.font = var$5;
    var$5 = "center";
    var$4.textAlign = var$5;
    var$5 = "#D0D0D0";
    var$4.fillStyle = var$5;
    var$8 = var$3.width / 2 | 0;
    var$9 = var$3.height / 2 | 0;
    var$4.fillText($rt_ustr($s), var$8, var$9);
}
function gj_Client_getCachedResourceURL($resource) {
    var $url, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$url = $thread.pop();$resource = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        $url = gj_Client_blobCache.$get0($resource);
        if ($url !== null)
            return $url;
        var$3 = gj_Client_guessMimeType($resource);
        $ptr = 1;
    case 1:
        $tmp = gj_Client_getResourceURL($resource, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$3 = $tmp;
        if (var$3 !== null)
            gj_Client_blobCache.$put($resource, var$3);
        return var$3;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($resource, $url, var$3, $ptr);
}
function gj_Client_guessMimeType($resource) {
    var var$2;
    gj_Client_$callClinit();
    var$2 = $resource.$toLowerCase0();
    if (var$2.$endsWith($rt_s(141)))
        return $rt_s(142);
    if (!var$2.$endsWith($rt_s(143)))
        return null;
    return $rt_s(144);
}
function gj_Client_getResourceURL($resource, $mediaType) {
    var $zfile, $content, $syncObject, var$6, var$7, var$8, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();$syncObject = $thread.pop();$content = $thread.pop();$zfile = $thread.pop();$mediaType = $thread.pop();$resource = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        $zfile = $rt_globals.zip.file($rt_ustr($resource));
        if ($zfile === null)
            return null;
        $content = $rt_createArray(otjt_Uint8Array, 1);
        $syncObject = jl_Object__init_();
        var$6 = gj_Client$getResourceURL$lambda$_11_0__init_($content, $syncObject);
        var$7 = gj_Client$getResourceURL$lambda$_11_1__init_($resource, $syncObject);
        ($zfile.async('uint8array')).then(otji_JS_function(var$6, "gotContent"), otji_JS_function(var$7, "gotError"));
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($syncObject);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                try {
                    $ptr = 2;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_InterruptedException) {
                    } else {
                        throw $$e;
                    }
                }
                jl_Object_monitorExit($syncObject);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;

            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$6);
        }
        var$8 = $content.data;
        if (var$8[0] === null)
            return null;
        if ($mediaType === null)
            return $rt_str(gj_Client_toBlobUrl$js_body$_8(var$8[0]));
        return $rt_str(gj_Client_toBlobUrl$js_body$_7(var$8[0], $rt_ustr($mediaType)));
    case 2:
        a: {
            try {
                b: {
                    try {
                        jl_Object_wait1($syncObject);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                }
                jl_Object_monitorExit($syncObject);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;

            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$6);
        }
        var$8 = $content.data;
        if (var$8[0] === null)
            return null;
        if ($mediaType === null)
            return $rt_str(gj_Client_toBlobUrl$js_body$_8(var$8[0]));
        return $rt_str(gj_Client_toBlobUrl$js_body$_7(var$8[0], $rt_ustr($mediaType)));
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($resource, $mediaType, $zfile, $content, $syncObject, var$6, var$7, var$8, $ptr);
}
function gj_Client_getResourceBytes($resource) {
    var $zfile, $content, $syncObject, var$5, var$6, var$7, $len, $r, $i, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$i = $thread.pop();$r = $thread.pop();$len = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();$syncObject = $thread.pop();$content = $thread.pop();$zfile = $thread.pop();$resource = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        $zfile = $rt_globals.zip.file($rt_ustr($resource));
        if ($zfile === null)
            return null;
        $content = $rt_createArray(otjt_Uint8Array, 1);
        $syncObject = jl_Object__init_();
        var$5 = gj_Client$getResourceBytes$lambda$_12_0__init_($content, $syncObject);
        var$6 = gj_Client$getResourceBytes$lambda$_12_1__init_($resource, $syncObject);
        ($zfile.async('uint8array')).then(otji_JS_function(var$5, "gotContent"), otji_JS_function(var$6, "gotError"));
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($syncObject);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                try {
                    $ptr = 2;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_InterruptedException) {
                    } else {
                        throw $$e;
                    }
                }
                jl_Object_monitorExit($syncObject);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$5 = $$je;

            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$5);
        }
        var$7 = $content.data;
        if (var$7[0] === null)
            return null;
        $len = var$7[0].length;
        $r = $rt_createByteArray($len);
        $i = 0;
        while ($i < $len) {
            $r.data[$i] = var$7[0][$i] << 24 >> 24;
            $i = $i + 1 | 0;
        }
        return $r;
    case 2:
        a: {
            try {
                b: {
                    try {
                        jl_Object_wait1($syncObject);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                }
                jl_Object_monitorExit($syncObject);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$5 = $$je;

            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$5);
        }
        var$7 = $content.data;
        if (var$7[0] === null)
            return null;
        $len = var$7[0].length;
        $r = $rt_createByteArray($len);
        $i = 0;
        while ($i < $len) {
            $r.data[$i] = var$7[0][$i] << 24 >> 24;
            $i = $i + 1 | 0;
        }
        return $r;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($resource, $zfile, $content, $syncObject, var$5, var$6, var$7, $len, $r, $i, $ptr);
}
function gj_Client_setupURLFactory($this) {
    jn_URL_setURLStreamHandlerFactory(gj_Client$4__init_($this));
}
function gj_Client_lambda$getResourceBytes$9($resource, $syncObject) {
    var var$3, $$je;
    gj_Client_$callClinit();
    (jl_System_out()).$println1((((jl_StringBuilder__init_()).$append8($rt_s(145))).$append8($resource)).$toString());
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$3);
}
function gj_Client_lambda$getResourceBytes$8($content, $syncObject, $c) {
    var var$4, $$je;
    gj_Client_$callClinit();
    $content.data[0] = $c;
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$4);
}
function gj_Client_lambda$getResourceURL$7($resource, $syncObject) {
    var var$3, $$je;
    gj_Client_$callClinit();
    (jl_System_out()).$println1((((jl_StringBuilder__init_()).$append8($rt_s(145))).$append8($resource)).$toString());
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$3);
}
function gj_Client_lambda$getResourceURL$6($content, $syncObject, $c) {
    var var$4, $$je;
    gj_Client_$callClinit();
    $content.data[0] = $c;
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$4);
}
function gj_Client_lambda$new$4($this, $e) {
    (gc_Simulation_getInstance()).$setPaused($this.$isPaused ? 0 : 1);
}
function gj_Client_lambda$new$3($speedSlider, $e) {
    gj_Client_$callClinit();
    (gc_Simulation_getInstance()).$setSpeed(jl_Integer_parseInt0($rt_str($speedSlider.value)));
}
function gj_Client_lambda$new$2($speedSlider, $e) {
    gj_Client_$callClinit();
    (gc_Simulation_getInstance()).$setSpeed(jl_Integer_parseInt0($rt_str($speedSlider.value)));
}
function gj_Client_lambda$new$1($this, $e) {
    (jl_Thread__init_3(gj_Client$lambda$new$1$lambda$_22_0__init_($this))).$start();
}
function gj_Client_lambda$new$0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        gj_Client_doReset($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function gj_Client_access$000($x0) {
    gj_Client_$callClinit();
    return $x0.$scenarioCanvas;
}
function gj_Client_access$102($x0, $x1) {
    gj_Client_$callClinit();
    $x0.$isPaused = $x1;
    return $x1;
}
function gj_Client__clinit_() {
    gj_Client_blobCache = ju_HashMap__init_();
}
function gj_Client_toBlobUrl$js_body$_7(var$1, var$2) {
    var blob = new $rt_globals.Blob([var$1], { type : var$2 });
    return $rt_globals.URL.createObjectURL(blob);
}
function gj_Client_toBlobUrl$js_body$_8(var$1) {
    var blob = new $rt_globals.Blob([var$1]);
    return $rt_globals.URL.createObjectURL(blob);
}
function otci_CharFlow() {
    var a = this; jl_Object.call(a);
    a.$characters0 = null;
    a.$pointer = 0;
}
function otci_CharFlow__init_(var_0) {
    var var_1 = new otci_CharFlow();
    otci_CharFlow__init_0(var_1, var_0);
    return var_1;
}
function otci_CharFlow__init_0($this, $characters) {
    jl_Object__init_0($this);
    $this.$characters0 = $characters;
}
function gc_TextLabel() {
    var a = this; jl_Object.call(a);
    a.$xpos = 0;
    a.$ypos = 0;
    a.$text = null;
    a.$lines = null;
    a.$dimensions = null;
    a.$lineWidths = null;
}
function gc_TextLabel__init_(var_0, var_1, var_2) {
    var var_3 = new gc_TextLabel();
    gc_TextLabel__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gc_TextLabel__init_0($this, $s, $xpos, $ypos) {
    jl_Object__init_0($this);
    $this.$text = $s;
    $this.$lines = gu_GreenfootUtil_getLines($this.$text);
    $this.$xpos = $xpos;
    $this.$ypos = $ypos;
}
function gc_TextLabel_draw($this, $g2d, $fontMetrics, $cellsize) {
    var var$4, $numLines, $textHeight, $baseline, $maxWidth, $i, var$10, $tm, $halfcell, $xdraw, $ydraw, var$15, var$16;
    var$4 = $fontMetrics.data;
    $numLines = $this.$lines.$size0();
    $textHeight = var$4[0];
    $baseline = var$4[1];
    if ($this.$dimensions === null) {
        $maxWidth = 0;
        $this.$lineWidths = $rt_createIntArray($numLines);
        $i = 0;
        while ($i < $numLines) {
            var$10 = $this.$lines.$get($i);
            $tm = $g2d.measureText($rt_ustr(var$10));
            $this.$lineWidths.data[$i] = $tm.width;
            $maxWidth = jl_Math_max($maxWidth, $this.$lineWidths.data[$i]);
            $i = $i + 1 | 0;
        }
        $this.$dimensions = $rt_createIntArray(2);
        $this.$dimensions.data[0] = $maxWidth;
        $this.$dimensions.data[1] = $rt_imul(var$4[0], $numLines);
    }
    $halfcell = $cellsize / 2 | 0;
    $xdraw = ($rt_imul($this.$xpos, $cellsize) - ($this.$dimensions.data[0] / 2 | 0) | 0) + $halfcell | 0;
    $ydraw = ($rt_imul($this.$ypos, $cellsize) - ($this.$dimensions.data[1] / 2 | 0) | 0) + $halfcell | 0;
    $maxWidth = $this.$dimensions.data[0];
    var$15 = $xdraw;
    var$16 = $ydraw;
    $g2d.translate(var$15, var$16);
    $i = 0;
    while ($i < $numLines) {
        var$10 = $this.$lines.$get($i);
        var$16 = ($maxWidth - $this.$lineWidths.data[$i] | 0) / 2 | 0;
        var$15 = $rt_imul($i, $textHeight) + $baseline | 0;
        $g2d.fillText($rt_ustr(var$10), var$16, var$15);
        var$10 = $this.$lines.$get($i);
        var$16 = ($maxWidth - $this.$lineWidths.data[$i] | 0) / 2 | 0;
        $g2d.strokeText($rt_ustr(var$10), var$16, var$15);
        $i = $i + 1 | 0;
    }
    var$15 =  -$xdraw | 0;
    var$16 =  -$ydraw | 0;
    $g2d.translate(var$15, var$16);
}
function gc_TextLabel_getX($this) {
    return $this.$xpos;
}
function gc_TextLabel_getY($this) {
    return $this.$ypos;
}
function gc_TextLabel_getText($this) {
    return $this.$text;
}
function gj_MouseManager$handleEvent$lambda$_10_0() {
    var a = this; jl_Object.call(a);
    a.$_018 = null;
    a.$_18 = null;
    a.$_22 = null;
}
function gj_MouseManager$handleEvent$lambda$_10_0__init_(var_0, var_1, var_2) {
    var var_3 = new gj_MouseManager$handleEvent$lambda$_10_0();
    gj_MouseManager$handleEvent$lambda$_10_0__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gj_MouseManager$handleEvent$lambda$_10_0__init_0(var$0, var$1, var$2, var$3) {
    jl_Object__init_0(var$0);
    var$0.$_018 = var$1;
    var$0.$_18 = var$2;
    var$0.$_22 = var$3;
}
function gj_MouseManager$handleEvent$lambda$_10_0_run(var$0) {
    gj_MouseManager_lambda$handleEvent$0(var$0.$_018, var$0.$_18, var$0.$_22);
}
var jn_BufferUnderflowException = $rt_classWithoutFields(jl_RuntimeException);
function jn_BufferUnderflowException__init_0() {
    var var_0 = new jn_BufferUnderflowException();
    jn_BufferUnderflowException__init_(var_0);
    return var_0;
}
function jn_BufferUnderflowException__init_($this) {
    jl_RuntimeException__init_1($this);
}
var otcit_FloatAnalyzer$Result = $rt_classWithoutFields();
function otcit_FloatAnalyzer$Result__init_() {
    var var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_0(var_0);
    return var_0;
}
function otcit_FloatAnalyzer$Result__init_0($this) {
    jl_Object__init_0($this);
}
var jl_InterruptedException = $rt_classWithoutFields(jl_Exception);
function jl_InterruptedException__init_() {
    var var_0 = new jl_InterruptedException();
    jl_InterruptedException__init_0(var_0);
    return var_0;
}
function jl_InterruptedException__init_0($this) {
    jl_Exception__init_0($this);
}
var ju_HashMap$EntryIterator = $rt_classWithoutFields(ju_HashMap$AbstractMapIterator);
function ju_HashMap$EntryIterator__init_(var_0) {
    var var_1 = new ju_HashMap$EntryIterator();
    ju_HashMap$EntryIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$EntryIterator__init_0($this, $map) {
    ju_HashMap$AbstractMapIterator__init_0($this, $map);
}
function ju_HashMap$EntryIterator_next($this) {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry;
}
function ju_HashMap$EntryIterator_next0($this) {
    return $this.$next6();
}
function gci_BSPNode() {
    var a = this; jl_Object.call(a);
    a.$actors = null;
    a.$parent = null;
    a.$area = null;
    a.$splitAxis = 0;
    a.$splitPos = 0;
    a.$left0 = null;
    a.$right0 = null;
    a.$areaRipple = 0;
}
function gci_BSPNode__init_(var_0, var_1, var_2) {
    var var_3 = new gci_BSPNode();
    gci_BSPNode__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gci_BSPNode__init_0($this, $area, $splitAxis, $splitPos) {
    jl_Object__init_0($this);
    $this.$area = $area;
    $this.$splitAxis = $splitAxis;
    $this.$splitPos = $splitPos;
    $this.$actors = ju_HashMap__init_();
}
function gci_BSPNode_setChild($this, $side, $child) {
    if ($side) {
        $this.$right0 = $child;
        if ($child !== null)
            $child.$parent = $this;
    } else {
        $this.$left0 = $child;
        if ($child !== null)
            $child.$parent = $this;
    }
}
function gci_BSPNode_setArea($this, $area) {
    $this.$area = $area;
    $this.$areaRipple = 1;
}
function gci_BSPNode_setSplitAxis($this, $axis) {
    if ($axis != $this.$splitAxis) {
        $this.$splitAxis = $axis;
        $this.$areaRipple = 1;
    }
}
function gci_BSPNode_setSplitPos($this, $pos) {
    if ($pos != $this.$splitPos) {
        $this.$splitPos = $pos;
        $this.$areaRipple = 1;
    }
}
function gci_BSPNode_getLeftArea($this) {
    if ($this.$splitAxis)
        return gci_Rect__init_(gci_Rect_getX($this.$area), gci_Rect_getY($this.$area), gci_Rect_getWidth($this.$area), $this.$splitPos - gci_Rect_getY($this.$area) | 0);
    return gci_Rect__init_(gci_Rect_getX($this.$area), gci_Rect_getY($this.$area), $this.$splitPos - gci_Rect_getX($this.$area) | 0, gci_Rect_getHeight($this.$area));
}
function gci_BSPNode_getRightArea($this) {
    if ($this.$splitAxis)
        return gci_Rect__init_(gci_Rect_getX($this.$area), $this.$splitPos, gci_Rect_getWidth($this.$area), gci_Rect_getTop($this.$area) - $this.$splitPos | 0);
    return gci_Rect__init_($this.$splitPos, gci_Rect_getY($this.$area), gci_Rect_getRight($this.$area) - $this.$splitPos | 0, gci_Rect_getHeight($this.$area));
}
function gci_BSPNode_getArea($this) {
    return $this.$area;
}
function gci_BSPNode_resizeChildren($this) {
    if ($this.$left0 !== null)
        gci_BSPNode_setArea($this.$left0, gci_BSPNode_getLeftArea($this));
    if ($this.$right0 !== null)
        gci_BSPNode_setArea($this.$right0, gci_BSPNode_getRightArea($this));
}
function gci_BSPNode_getLeft($this) {
    if ($this.$areaRipple) {
        gci_BSPNode_resizeChildren($this);
        $this.$areaRipple = 0;
    }
    return $this.$left0;
}
function gci_BSPNode_getRight($this) {
    if ($this.$areaRipple) {
        gci_BSPNode_resizeChildren($this);
        $this.$areaRipple = 0;
    }
    return $this.$right0;
}
function gci_BSPNode_getParent($this) {
    return $this.$parent;
}
function gci_BSPNode_setParent($this, $parent) {
    $this.$parent = $parent;
}
function gci_BSPNode_getChildSide($this, $child) {
    if ($this.$left0 !== $child)
        return 1;
    return 0;
}
function gci_BSPNode_addActor($this, $actor) {
    $this.$actors.$put($actor, gci_ActorNode__init_($actor, $this));
}
function gci_BSPNode_containsActor($this, $actor) {
    var $anode;
    $anode = $this.$actors.$get0($actor);
    if ($anode === null)
        return 0;
    gci_ActorNode_mark($anode);
    return 1;
}
function gci_BSPNode_actorRemoved($this, $actor) {
    $this.$actors.$remove2($actor);
}
function gci_BSPNode_isEmpty($this) {
    return $this.$actors.$isEmpty();
}
function gci_BSPNode_getActorsIterator($this) {
    return ($this.$actors.$keySet()).$iterator();
}
function gci_BSPNode_blankNode($this) {
    $this.$actors.$clear0();
}
function gci_BSPNode_areaChanged($this) {
    $this.$areaRipple = 1;
}
$rt_packages([-1, "java", 0, "util", 0, "nio", 2, "charset", 0, "io", 0, "lang", -1, "greenfoot"
]);
$rt_metadata([jl_Object, "Object", 5, 0, [], 0, 3, 0, 0, ["$isEmptyMonitor", $rt_wrapFunction0(jl_Object_isEmptyMonitor), "$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$hashCode0", $rt_wrapFunction0(jl_Object_hashCode), "$equals", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone", $rt_wrapFunction0(jl_Object_clone), "$notify", $rt_wrapFunction0(jl_Object_notify), "$notifyAll", $rt_wrapFunction0(jl_Object_notifyAll),
"$wait0", $rt_wrapFunction1(jl_Object_wait), "$waitImpl0", $rt_wrapFunction3(jl_Object_waitImpl0), "$wait1", $rt_wrapFunction0(jl_Object_wait1)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getLocalizedMessage", $rt_wrapFunction0(jl_Throwable_getLocalizedMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause), "$printStackTrace0", $rt_wrapFunction0(jl_Throwable_printStackTrace), "$printStackTrace", $rt_wrapFunction1(jl_Throwable_printStackTrace0)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Exception__init_0), "$_init_", $rt_wrapFunction1(jl_Exception__init_2)],
jl_RuntimeException, "RuntimeException", 5, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_RuntimeException__init_1), "$_init_", $rt_wrapFunction1(jl_RuntimeException__init_2)],
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0), "$_init_", $rt_wrapFunction1(jl_IndexOutOfBoundsException__init_2)],
gp_GreenfootUtilDelegate, 0, jl_Object, [], 3, 3, 0, 0, 0,
gj_GreenfootUtilJsDelegate, 0, jl_Object, [gp_GreenfootUtilDelegate], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gj_GreenfootUtilJsDelegate__init_0), "$getGreenfootLogoPath", $rt_wrapFunction0(gj_GreenfootUtilJsDelegate_getGreenfootLogoPath)],
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
ji_InputStream, 0, jl_Object, [ji_Closeable], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ji_InputStream__init_), "$read0", $rt_wrapFunction1(ji_InputStream_read)],
ji_FilterInputStream, 0, ji_InputStream, [], 0, 3, 0, 0, ["$_init_4", $rt_wrapFunction1(ji_FilterInputStream__init_0)],
ji_BufferedInputStream, 0, ji_FilterInputStream, [], 0, 3, 0, 0, ["$_init_4", $rt_wrapFunction1(ji_BufferedInputStream__init_0), "$read1", $rt_wrapFunction0(ji_BufferedInputStream_read)],
ju_Enumeration, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
gj_MouseManager$handleTouchEvent$lambda$_11_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, ["$_init_41", $rt_wrapFunction3(gj_MouseManager$handleTouchEvent$lambda$_11_0__init_0), "$run", $rt_wrapFunction0(gj_MouseManager$handleTouchEvent$lambda$_11_0_run)],
jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_46", $rt_wrapFunction2(jnci_BufferedEncoder$Controller__init_0), "$hasMoreInput", $rt_wrapFunction0(jnci_BufferedEncoder$Controller_hasMoreInput), "$hasMoreOutput", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_hasMoreOutput), "$setInPosition", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_setInPosition), "$setOutPosition", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_setOutPosition)],
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Number__init_)],
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, ["$_init_5", $rt_wrapFunction1(jl_Integer__init_0), "$intValue", $rt_wrapFunction0(jl_Integer_intValue), "$hashCode0", $rt_wrapFunction0(jl_Integer_hashCode0), "$equals", $rt_wrapFunction1(jl_Integer_equals)],
jl_CloneNotSupportedException, "CloneNotSupportedException", 5, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_CloneNotSupportedException__init_0)],
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
otjt_ArrayBufferView, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otjt_Uint8Array, 0, otjt_ArrayBufferView, [], 1, 3, 0, 0, 0,
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, 0, jl_AbstractStringBuilder$Constants_$callClinit, ["$_init_0", $rt_wrapFunction0(jl_AbstractStringBuilder$Constants__init_0)],
otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
otr_EventQueue$Event, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Object$NotifyListener, 0, jl_Object, [otp_PlatformRunnable, otr_EventQueue$Event], 3, 0, 0, 0, 0,
otjb_TimerHandler, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
jl_ThreadInterruptHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Object$NotifyListenerImpl, 0, jl_Object, [jl_Object$NotifyListener, otjb_TimerHandler, otp_PlatformRunnable, jl_ThreadInterruptHandler], 0, 0, 0, 0, ["$_init_3", $rt_wrapFunction3(jl_Object$NotifyListenerImpl__init_0), "$expired", $rt_wrapFunction0(jl_Object$NotifyListenerImpl_expired), "$onTimer", $rt_wrapFunction0(jl_Object$NotifyListenerImpl_onTimer), "$run", $rt_wrapFunction0(jl_Object$NotifyListenerImpl_run), "$interrupted", $rt_wrapFunction0(jl_Object$NotifyListenerImpl_interrupted), "$onTimer$exported$0",
$rt_wrapFunction0(jl_Object$NotifyListenerImpl_onTimer$exported$0)],
otjdx_Node, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjdx_Document, 0, jl_Object, [otjdx_Node], 3, 3, 0, 0, 0,
otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjdh_HTMLDocument, 0, jl_Object, [otjdx_Document, otjde_EventTarget], 3, 3, 0, 0, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Long_$callClinit, 0,
ju_Map, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, jl_Thread_$callClinit, ["$_init_0", $rt_wrapFunction0(jl_Thread__init_0), "$_init_", $rt_wrapFunction1(jl_Thread__init_2), "$_init_21", $rt_wrapFunction1(jl_Thread__init_4), "$_init_7", $rt_wrapFunction2(jl_Thread__init_6), "$start", $rt_wrapFunction0(jl_Thread_start), "$run", $rt_wrapFunction0(jl_Thread_run), "$interrupt", $rt_wrapFunction0(jl_Thread_interrupt), "$setPriority", $rt_wrapFunction1(jl_Thread_setPriority), "$getUncaughtExceptionHandler", $rt_wrapFunction0(jl_Thread_getUncaughtExceptionHandler)],
g_Actor, "Actor", 6, jl_Object, [], 1, 3, 0, g_Actor_$callClinit, ["$_init_0", $rt_wrapFunction0(g_Actor__init_), "$getX", $rt_wrapFunction0(g_Actor_getX), "$getY", $rt_wrapFunction0(g_Actor_getY), "$setRotation", $rt_wrapFunction1(g_Actor_setRotation), "$turnTowards", $rt_wrapFunction2(g_Actor_turnTowards), "$setLocation", $rt_wrapFunction2(g_Actor_setLocation), "$move", $rt_wrapFunction1(g_Actor_move), "$getWorld", $rt_wrapFunction0(g_Actor_getWorld), "$addedToWorld", $rt_wrapFunction1(g_Actor_addedToWorld),
"$getImage1", $rt_wrapFunction0(g_Actor_getImage), "$setImage", $rt_wrapFunction1(g_Actor_setImage), "$setWorld", $rt_wrapFunction1(g_Actor_setWorld), "$addToWorld", $rt_wrapFunction3(g_Actor_addToWorld), "$getBoundingRect", $rt_wrapFunction0(g_Actor_getBoundingRect), "$setData0", $rt_wrapFunction1(g_Actor_setData), "$getData0", $rt_wrapFunction0(g_Actor_getData), "$intersects1", $rt_wrapFunction1(g_Actor_intersects), "$getOneIntersectingObject0", $rt_wrapFunction1(g_Actor_getOneIntersectingObject), "$isTouching",
$rt_wrapFunction1(g_Actor_isTouching), "$containsPoint", $rt_wrapFunction2(g_Actor_containsPoint), "$getSequenceNumber", $rt_wrapFunction0(g_Actor_getSequenceNumber), "$getSleepingFor", $rt_wrapFunction0(g_Actor_getSleepingFor), "$setSleepingFor", $rt_wrapFunction1(g_Actor_setSleepingFor), "$getLastPaintSeqNum", $rt_wrapFunction0(g_Actor_getLastPaintSeqNum), "$setLastPaintSeqNum", $rt_wrapFunction1(g_Actor_setLastPaintSeqNum), "$getImage", $rt_wrapFunction1(g_Actor_getImage0), "$getActiveWorld", $rt_wrapFunction0(g_Actor_getActiveWorld)],
wintxt, "wintxt", -1, g_Actor, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(wintxt__init_0)],
gj_ContentReceiver, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
gj_Client$getResourceBytes$lambda$_12_0, 0, jl_Object, [gj_ContentReceiver], 0, 3, 0, 0, ["$_init_65", $rt_wrapFunction2(gj_Client$getResourceBytes$lambda$_12_0__init_0), "$gotContent", $rt_wrapFunction1(gj_Client$getResourceBytes$lambda$_12_0_gotContent), "$gotContent$exported$0", $rt_wrapFunction1(gj_Client$getResourceBytes$lambda$_12_0_gotContent$exported$0)],
gj_ErrorCallback, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
gj_Client$getResourceBytes$lambda$_12_1, 0, jl_Object, [gj_ErrorCallback], 0, 3, 0, 0, ["$_init_66", $rt_wrapFunction2(gj_Client$getResourceBytes$lambda$_12_1__init_0), "$gotError", $rt_wrapFunction0(gj_Client$getResourceBytes$lambda$_12_1_gotError), "$gotError$exported$0", $rt_wrapFunction0(gj_Client$getResourceBytes$lambda$_12_1_gotError$exported$0)],
otp_PlatformQueue, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otjde_GamepadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Error__init_0), "$_init_", $rt_wrapFunction1(jl_Error__init_2), "$_init_11", $rt_wrapFunction1(jl_Error__init_4)],
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_LinkageError__init_0), "$_init_", $rt_wrapFunction1(jl_LinkageError__init_2)],
otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0]);
$rt_metadata([jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 5, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
otjde_EventListener, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
gj_TouchManager, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$_init_39", $rt_wrapFunction1(gj_TouchManager__init_0), "$handleEvent", $rt_wrapFunction1(gj_TouchManager_handleEvent), "$handleEvent0", $rt_wrapFunction1(gj_TouchManager_handleEvent0), "$handleEvent$exported$0", $rt_wrapFunction1(gj_TouchManager_handleEvent$exported$0)],
jn_ByteOrder, 0, jl_Object, [], 4, 3, 0, jn_ByteOrder_$callClinit, 0,
otci_Base46, 0, jl_Object, [], 4, 3, 0, 0, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ji_OutputStream__init_)],
otcic_ConsoleOutputStream, 0, ji_OutputStream, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcic_ConsoleOutputStream__init_)],
otcic_StdoutOutputStream, 0, otcic_ConsoleOutputStream, [], 0, 3, 0, otcic_StdoutOutputStream_$callClinit, ["$write", $rt_wrapFunction3(otcic_StdoutOutputStream_write)],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_5", $rt_wrapFunction1(jl_AbstractStringBuilder__init_2), "$append3", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$append4", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$append5", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$append2", $rt_wrapFunction2(jl_AbstractStringBuilder_append2),
"$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert0), "$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$append7", $rt_wrapFunction1(jl_AbstractStringBuilder_append4), "$insert3", $rt_wrapFunction2(jl_AbstractStringBuilder_insert2), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert3), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString),
"$length", $rt_wrapFunction0(jl_AbstractStringBuilder_length), "$getChars", $rt_wrapFunction4(jl_AbstractStringBuilder_getChars), "$setLength", $rt_wrapFunction1(jl_AbstractStringBuilder_setLength)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append8", $rt_wrapFunction1(jl_StringBuilder_append2), "$append1", $rt_wrapFunction1(jl_StringBuilder_append1), "$append9", $rt_wrapFunction1(jl_StringBuilder_append3), "$append0", $rt_wrapFunction1(jl_StringBuilder_append0), "$insert6", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert0),
"$insert5", $rt_wrapFunction2(jl_StringBuilder_insert1), "$insert7", $rt_wrapFunction2(jl_StringBuilder_insert2), "$setLength", $rt_wrapFunction1(jl_StringBuilder_setLength), "$getChars", $rt_wrapFunction4(jl_StringBuilder_getChars), "$length", $rt_wrapFunction0(jl_StringBuilder_length), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert3), "$insert3", $rt_wrapFunction2(jl_StringBuilder_insert4),
"$insert2", $rt_wrapFunction2(jl_StringBuilder_insert5), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert6)],
ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ConcurrentModificationException__init_0)],
ju_Hashtable$1, 0, jl_Object, [ju_Enumeration], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Hashtable$1__init_0)],
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Hashtable$2, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Hashtable$2__init_0)],
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, ["$_init_13", $rt_wrapFunction2(ju_MapEntry__init_0), "$equals", $rt_wrapFunction1(ju_MapEntry_equals), "$getKey", $rt_wrapFunction0(ju_MapEntry_getKey), "$getValue", $rt_wrapFunction0(ju_MapEntry_getValue), "$hashCode0", $rt_wrapFunction0(ju_MapEntry_hashCode)],
ju_Hashtable$Entry, 0, ju_MapEntry, [], 0, 0, 0, 0, ["$_init_13", $rt_wrapFunction2(ju_Hashtable$Entry__init_0), "$getKeyHash", $rt_wrapFunction0(ju_Hashtable$Entry_getKeyHash), "$equalsKey", $rt_wrapFunction2(ju_Hashtable$Entry_equalsKey)],
g_MouseInfoVisitor, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(g_MouseInfoVisitor__init_0)],
enemy, "enemy", -1, g_Actor, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(enemy__init_0), "$act", $rt_wrapFunction0(enemy_act)],
jl_ReflectiveOperationException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_ReflectiveOperationException__init_0)],
gc_CollisionQuery, 0, jl_Object, [], 3, 3, 0, 0, 0,
gc_GOCollisionQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gc_GOCollisionQuery__init_0), "$init", $rt_wrapFunction2(gc_GOCollisionQuery_init), "$checkCollision", $rt_wrapFunction1(gc_GOCollisionQuery_checkCollision)],
jnc_CoderMalfunctionError, "CoderMalfunctionError", 3, jl_Error, [], 0, 3, 0, 0, ["$_init_11", $rt_wrapFunction1(jnc_CoderMalfunctionError__init_0)],
gj_Client$_init_$lambda$_1_3, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$_init_60", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_3__init_0), "$handleEvent0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_3_handleEvent), "$handleEvent1", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_3_handleEvent0), "$handleEvent$exported$0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_3_handleEvent$exported$0)],
gj_Client$_init_$lambda$_1_2, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$_init_61", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_2__init_0), "$handleEvent0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_2_handleEvent), "$handleEvent$exported$0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_2_handleEvent$exported$0)],
gj_Client$_init_$lambda$_1_1, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$_init_61", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_1__init_0), "$handleEvent0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_1_handleEvent), "$handleEvent$exported$0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_1_handleEvent$exported$0)],
gci_ActorNode, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_67", $rt_wrapFunction2(gci_ActorNode__init_0), "$clearMark", $rt_wrapFunction0(gci_ActorNode_clearMark), "$mark2", $rt_wrapFunction0(gci_ActorNode_mark), "$checkMark", $rt_wrapFunction0(gci_ActorNode_checkMark), "$getBSPNode", $rt_wrapFunction0(gci_ActorNode_getBSPNode), "$getNext", $rt_wrapFunction0(gci_ActorNode_getNext), "$remove", $rt_wrapFunction0(gci_ActorNode_remove), "$removed", $rt_wrapFunction0(gci_ActorNode_removed)],
jn_Buffer, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_5", $rt_wrapFunction1(jn_Buffer__init_), "$position1", $rt_wrapFunction0(jn_Buffer_position), "$position3", $rt_wrapFunction1(jn_Buffer_position0), "$clear", $rt_wrapFunction0(jn_Buffer_clear), "$remaining", $rt_wrapFunction0(jn_Buffer_remaining), "$hasRemaining", $rt_wrapFunction0(jn_Buffer_hasRemaining)],
g_Color, 0, jl_Object, [], 0, 3, 0, g_Color_$callClinit, ["$_init_14", $rt_wrapFunction3(g_Color__init_0), "$getRed", $rt_wrapFunction0(g_Color_getRed), "$getGreen", $rt_wrapFunction0(g_Color_getGreen), "$getAlpha", $rt_wrapFunction0(g_Color_getAlpha), "$getBlue", $rt_wrapFunction0(g_Color_getBlue)],
gj_Client$getResourceURL$lambda$_11_0, 0, jl_Object, [gj_ContentReceiver], 0, 3, 0, 0, ["$_init_65", $rt_wrapFunction2(gj_Client$getResourceURL$lambda$_11_0__init_0), "$gotContent", $rt_wrapFunction1(gj_Client$getResourceURL$lambda$_11_0_gotContent), "$gotContent$exported$0", $rt_wrapFunction1(gj_Client$getResourceURL$lambda$_11_0_gotContent$exported$0)],
gj_Client$_init_$lambda$_1_0, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$_init_60", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_0__init_0), "$handleEvent0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_0_handleEvent), "$handleEvent1", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_0_handleEvent0), "$handleEvent$exported$0", $rt_wrapFunction1(gj_Client$_init_$lambda$_1_0_handleEvent$exported$0)],
gj_Client$getResourceURL$lambda$_11_1, 0, jl_Object, [gj_ErrorCallback], 0, 3, 0, 0, ["$_init_66", $rt_wrapFunction2(gj_Client$getResourceURL$lambda$_11_1__init_0), "$gotError", $rt_wrapFunction0(gj_Client$getResourceURL$lambda$_11_1_gotError), "$gotError$exported$0", $rt_wrapFunction0(gj_Client$getResourceURL$lambda$_11_1_gotError$exported$0)],
gci_Rect, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_10", $rt_wrapFunction4(gci_Rect__init_0), "$copyFrom", $rt_wrapFunction1(gci_Rect_copyFrom), "$getX", $rt_wrapFunction0(gci_Rect_getX), "$getMiddleX", $rt_wrapFunction0(gci_Rect_getMiddleX), "$getRight", $rt_wrapFunction0(gci_Rect_getRight), "$getY", $rt_wrapFunction0(gci_Rect_getY), "$getMiddleY", $rt_wrapFunction0(gci_Rect_getMiddleY), "$getTop", $rt_wrapFunction0(gci_Rect_getTop), "$getWidth", $rt_wrapFunction0(gci_Rect_getWidth), "$getHeight", $rt_wrapFunction0(gci_Rect_getHeight),
"$contains", $rt_wrapFunction1(gci_Rect_contains), "$setX", $rt_wrapFunction1(gci_Rect_setX), "$setY", $rt_wrapFunction1(gci_Rect_setY), "$intersects", $rt_wrapFunction1(gci_Rect_intersects)],
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IncompatibleClassChangeError__init_0), "$_init_", $rt_wrapFunction1(jl_IncompatibleClassChangeError__init_2)],
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NoSuchMethodError__init_0), "$_init_", $rt_wrapFunction1(jl_NoSuchMethodError__init_2)],
ji_IOException, "IOException", 4, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ji_IOException__init_1), "$_init_", $rt_wrapFunction1(ji_IOException__init_2)],
gc_PointCollisionQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gc_PointCollisionQuery__init_0)],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_84_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_String$_clinit_$lambda$_84_0__init_0)],
gc_CollisionChecker, 0, jl_Object, [], 3, 3, 0, 0, 0,
gci_IBSPColChecker, 0, jl_Object, [gc_CollisionChecker], 0, 3, 0, gci_IBSPColChecker_$callClinit, ["$_init_0", $rt_wrapFunction0(gci_IBSPColChecker__init_0), "$initialize0", $rt_wrapFunction4(gci_IBSPColChecker_initialize), "$addObject", $rt_wrapFunction1(gci_IBSPColChecker_addObject), "$getActorBounds", $rt_wrapFunction1(gci_IBSPColChecker_getActorBounds), "$removeObject", $rt_wrapFunction1(gci_IBSPColChecker_removeObject), "$updateObjectLocation", $rt_wrapFunction3(gci_IBSPColChecker_updateObjectLocation),
"$updateObjectSize", $rt_wrapFunction1(gci_IBSPColChecker_updateObjectSize), "$getOneIntersectingUp", $rt_wrapFunction4(gci_IBSPColChecker_getOneIntersectingUp), "$startSequence", $rt_wrapFunction0(gci_IBSPColChecker_startSequence), "$getOneIntersectingObject", $rt_wrapFunction2(gci_IBSPColChecker_getOneIntersectingObject)],
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_32", $rt_wrapFunction1(ju_AbstractList$1__init_0), "$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next1", $rt_wrapFunction0(ju_AbstractList$1_next), "$remove", $rt_wrapFunction0(ju_AbstractList$1_remove)],
gc_ActInterruptedException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gc_ActInterruptedException__init_0)],
gc_ImageCache, 0, jl_Object, [], 0, 3, 0, gc_ImageCache_$callClinit, ["$_init_0", $rt_wrapFunction0(gc_ImageCache__init_0), "$addCachedImage", $rt_wrapFunction2(gc_ImageCache_addCachedImage), "$getCachedImage", $rt_wrapFunction1(gc_ImageCache_getCachedImage)],
jl_UnsupportedOperationException, "UnsupportedOperationException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_UnsupportedOperationException__init_0), "$_init_", $rt_wrapFunction1(jl_UnsupportedOperationException__init_2)],
jn_ReadOnlyBufferException, "ReadOnlyBufferException", 2, jl_UnsupportedOperationException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_ReadOnlyBufferException__init_0)],
ge_WorldListener, 0, jl_Object, [], 3, 3, 0, 0, 0]);
$rt_metadata([gc_Simulation, 0, jl_Thread, [ge_WorldListener], 0, 3, 0, gc_Simulation_$callClinit, ["$attachWorldHandler", $rt_wrapFunction1(gc_Simulation_attachWorldHandler), "$run", $rt_wrapFunction0(gc_Simulation_run), "$setPaused", $rt_wrapFunction1(gc_Simulation_setPaused), "$setEnabled", $rt_wrapFunction1(gc_Simulation_setEnabled), "$addSimulationListener", $rt_wrapFunction1(gc_Simulation_addSimulationListener), "$setSpeed", $rt_wrapFunction1(gc_Simulation_setSpeed), "$getSpeed", $rt_wrapFunction0(gc_Simulation_getSpeed),
"$worldCreated", $rt_wrapFunction1(gc_Simulation_worldCreated), "$worldRemoved", $rt_wrapFunction1(gc_Simulation_worldRemoved)],
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jlr_Array__init_0)],
jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_6", $rt_wrapFunction1(jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_0), "$run", $rt_wrapFunction0(jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0_run)],
gu_GreenfootUtil, 0, jl_Object, [], 0, 3, 0, gu_GreenfootUtil_$callClinit, ["$_init_0", $rt_wrapFunction0(gu_GreenfootUtil__init_0)],
ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcit_DoubleAnalyzer$Result__init_0)],
ju_Random, 0, jl_Object, [ji_Serializable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Random__init_0)],
otpp_ResourceAccessor, 0, jl_Object, [], 4, 0, 0, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NoSuchFieldError__init_0), "$_init_", $rt_wrapFunction1(jl_NoSuchFieldError__init_2)],
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractCollection__init_), "$isEmpty", $rt_wrapFunction0(ju_AbstractCollection_isEmpty), "$toArray", $rt_wrapFunction1(ju_AbstractCollection_toArray), "$remove3", $rt_wrapFunction1(ju_AbstractCollection_remove)],
gu_GraphicsUtilities, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gu_GraphicsUtilities__init_0)],
ji_ByteArrayInputStream, 0, ji_InputStream, [], 0, 3, 0, 0, ["$_init_18", $rt_wrapFunction3(ji_ByteArrayInputStream__init_0), "$_init_62", $rt_wrapFunction1(ji_ByteArrayInputStream__init_2), "$read", $rt_wrapFunction3(ji_ByteArrayInputStream_read)],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_InstantiationException, "InstantiationException", 5, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_InstantiationException__init_0)],
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_DefaultUncaughtExceptionHandler__init_0), "$uncaughtException", $rt_wrapFunction2(jl_DefaultUncaughtExceptionHandler_uncaughtException)],
jl_Readable, 0, jl_Object, [], 3, 3, 0, 0, 0,
g_ImageVisitor, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(g_ImageVisitor__init_0)],
otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
jn_URLStreamHandlerFactory, 0, jl_Object, [], 3, 3, 0, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_1", $rt_wrapFunction4(jl_Object$monitorEnterWait$lambda$_6_0__init_0), "$run", $rt_wrapFunction0(jl_Object$monitorEnterWait$lambda$_6_0_run)],
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Objects__init_0)],
g_GreenfootImage$2, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$_init_36", $rt_wrapFunction3(g_GreenfootImage$2__init_0), "$handleEvent0", $rt_wrapFunction1(g_GreenfootImage$2_handleEvent), "$handleEvent$exported$0", $rt_wrapFunction1(g_GreenfootImage$2_handleEvent$exported$0)],
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, ["$_init_16", $rt_wrapFunction2(ju_HashMap$HashEntry__init_0)],
g_GreenfootImage$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$_init_36", $rt_wrapFunction3(g_GreenfootImage$1__init_0), "$handleEvent0", $rt_wrapFunction1(g_GreenfootImage$1_handleEvent), "$handleEvent$exported$0", $rt_wrapFunction1(g_GreenfootImage$1_handleEvent$exported$0)],
jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_23", $rt_wrapFunction4(jnc_CharsetEncoder__init_), "$_init_45", $rt_wrapFunction3(jnc_CharsetEncoder__init_0), "$onMalformedInput", $rt_wrapFunction1(jnc_CharsetEncoder_onMalformedInput), "$implOnMalformedInput", $rt_wrapFunction1(jnc_CharsetEncoder_implOnMalformedInput), "$onUnmappableCharacter", $rt_wrapFunction1(jnc_CharsetEncoder_onUnmappableCharacter), "$implOnUnmappableCharacter", $rt_wrapFunction1(jnc_CharsetEncoder_implOnUnmappableCharacter),
"$encode", $rt_wrapFunction3(jnc_CharsetEncoder_encode), "$flush", $rt_wrapFunction1(jnc_CharsetEncoder_flush), "$implFlush", $rt_wrapFunction1(jnc_CharsetEncoder_implFlush)],
otjb_Performance, 0, jl_Object, [otj_JSObject], 4, 3, 0, 0, 0,
g_World, "World", 6, jl_Object, [], 1, 3, 0, g_World_$callClinit, ["$_init_14", $rt_wrapFunction3(g_World__init_), "$_init_24", $rt_wrapFunction4(g_World__init_0), "$setBackground", $rt_wrapFunction1(g_World_setBackground), "$getBackground", $rt_wrapFunction0(g_World_getBackground), "$getWidth", $rt_wrapFunction0(g_World_getWidth), "$getHeight", $rt_wrapFunction0(g_World_getHeight), "$getCellSize", $rt_wrapFunction0(g_World_getCellSize), "$addObject0", $rt_wrapFunction3(g_World_addObject), "$removeObject", $rt_wrapFunction1(g_World_removeObject),
"$getObjects", $rt_wrapFunction1(g_World_getObjects), "$act", $rt_wrapFunction0(g_World_act), "$started", $rt_wrapFunction0(g_World_started), "$stopped", $rt_wrapFunction0(g_World_stopped), "$showText", $rt_wrapFunction3(g_World_showText), "$isBounded", $rt_wrapFunction0(g_World_isBounded), "$getHeightInPixels", $rt_wrapFunction0(g_World_getHeightInPixels), "$getWidthInPixels", $rt_wrapFunction0(g_World_getWidthInPixels), "$toCellFloor0", $rt_wrapFunction1(g_World_toCellFloor), "$getObjectsAtPixel0", $rt_wrapFunction2(g_World_getObjectsAtPixel),
"$updateObjectLocation", $rt_wrapFunction3(g_World_updateObjectLocation), "$updateObjectSize", $rt_wrapFunction1(g_World_updateObjectSize), "$startSequence", $rt_wrapFunction0(g_World_startSequence), "$getOneIntersectingObject", $rt_wrapFunction2(g_World_getOneIntersectingObject), "$getObjectsListInPaintOrder", $rt_wrapFunction0(g_World_getObjectsListInPaintOrder), "$getObjectsListInActOrder0", $rt_wrapFunction0(g_World_getObjectsListInActOrder)],
loose, "loose", -1, g_World, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(loose__init_0), "$act", $rt_wrapFunction0(loose_act)],
gj_Client$lambda$new$1$lambda$_22_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, ["$_init_60", $rt_wrapFunction1(gj_Client$lambda$new$1$lambda$_22_0__init_0), "$run", $rt_wrapFunction0(gj_Client$lambda$new$1$lambda$_22_0_run)],
ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
jl_ArrayStoreException, "ArrayStoreException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0, ["$_init_28", function(var_1, var_2, var_3, var_4, var_5) { jn_ByteBuffer__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$put1", $rt_wrapFunction3(jn_ByteBuffer_put0), "$put0", $rt_wrapFunction1(jn_ByteBuffer_put), "$clear1", $rt_wrapFunction0(jn_ByteBuffer_clear)],
jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, 0, ["$_init_27", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { jn_ByteBufferImpl__init_0(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }, "$isReadOnly", $rt_wrapFunction0(jn_ByteBufferImpl_isReadOnly)],
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_29", $rt_wrapFunction1(ju_HashMap$AbstractMapIterator__init_0), "$hasNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_hasNext), "$checkConcurrentMod", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_checkConcurrentMod), "$makeNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_makeNext)],
ju_HashMap$KeyIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, 0, ["$_init_29", $rt_wrapFunction1(ju_HashMap$KeyIterator__init_0), "$next1", $rt_wrapFunction0(ju_HashMap$KeyIterator_next)],
jl_Thread$SleepHandler, 0, jl_Object, [otp_PlatformRunnable, otr_EventQueue$Event, jl_ThreadInterruptHandler], 0, 0, 0, 0, ["$_init_9", $rt_wrapFunction2(jl_Thread$SleepHandler__init_0), "$interrupted", $rt_wrapFunction0(jl_Thread$SleepHandler_interrupted), "$run", $rt_wrapFunction0(jl_Thread$SleepHandler_run)],
gc_ColManager, 0, jl_Object, [gc_CollisionChecker], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gc_ColManager__init_0), "$addObject", $rt_wrapFunction1(gc_ColManager_addObject), "$getOneIntersectingObject", $rt_wrapFunction2(gc_ColManager_getOneIntersectingObject), "$initialize0", $rt_wrapFunction4(gc_ColManager_initialize), "$removeObject", $rt_wrapFunction1(gc_ColManager_removeObject), "$startSequence", $rt_wrapFunction0(gc_ColManager_startSequence), "$updateObjectLocation", $rt_wrapFunction3(gc_ColManager_updateObjectLocation),
"$updateObjectSize", $rt_wrapFunction1(gc_ColManager_updateObjectSize)],
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractSet__init_), "$equals", $rt_wrapFunction1(ju_AbstractSet_equals), "$hashCode0", $rt_wrapFunction0(ju_AbstractSet_hashCode)],
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_HashSet__init_1), "$_init_31", $rt_wrapFunction1(ju_HashSet__init_0), "$_init_29", $rt_wrapFunction1(ju_HashSet__init_4), "$add", $rt_wrapFunction1(ju_HashSet_add), "$contains0", $rt_wrapFunction1(ju_HashSet_contains), "$iterator", $rt_wrapFunction0(ju_HashSet_iterator), "$size0", $rt_wrapFunction0(ju_HashSet_size)],
g_ActorSet$ActorSetIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_54", $rt_wrapFunction1(g_ActorSet$ActorSetIterator__init_0), "$hasNext", $rt_wrapFunction0(g_ActorSet$ActorSetIterator_hasNext), "$next4", $rt_wrapFunction0(g_ActorSet$ActorSetIterator_next), "$next1", $rt_wrapFunction0(g_ActorSet$ActorSetIterator_next0)],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, ["$_init_51", $rt_wrapFunction2(jnc_Charset__init_)],
gp_ActorDelegate, 0, jl_Object, [], 3, 3, 0, 0, 0,
jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, 0, jnc_CodingErrorAction_$callClinit, ["$_init_", $rt_wrapFunction1(jnc_CodingErrorAction__init_0)],
jl_IllegalArgumentException, "IllegalArgumentException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalArgumentException__init_2), "$_init_", $rt_wrapFunction1(jl_IllegalArgumentException__init_)]]);
$rt_metadata([jnc_IllegalCharsetNameException, "IllegalCharsetNameException", 3, jl_IllegalArgumentException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(jnc_IllegalCharsetNameException__init_0)],
ju_List, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractList__init_), "$add", $rt_wrapFunction1(ju_AbstractList_add), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator), "$hashCode0", $rt_wrapFunction0(ju_AbstractList_hashCode), "$equals", $rt_wrapFunction1(ju_AbstractList_equals)],
ju_AbstractSequentialList, 0, ju_AbstractList, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractSequentialList__init_), "$get", $rt_wrapFunction1(ju_AbstractSequentialList_get), "$add1", $rt_wrapFunction2(ju_AbstractSequentialList_add), "$iterator", $rt_wrapFunction0(ju_AbstractSequentialList_iterator)],
ju_Deque, 0, jl_Object, [ju_Queue], 3, 3, 0, 0, 0,
ju_LinkedList, 0, ju_AbstractSequentialList, [ju_Deque], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_LinkedList__init_0), "$size0", $rt_wrapFunction0(ju_LinkedList_size), "$listIterator0", $rt_wrapFunction0(ju_LinkedList_listIterator), "$listIterator", $rt_wrapFunction1(ju_LinkedList_listIterator0), "$poll", $rt_wrapFunction0(ju_LinkedList_poll), "$removeLast", $rt_wrapFunction0(ju_LinkedList_removeLast), "$pollLast", $rt_wrapFunction0(ju_LinkedList_pollLast)],
ju_NoSuchElementException, "NoSuchElementException", 1, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_NoSuchElementException__init_0)],
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_34", $rt_wrapFunction1(ji_FilterOutputStream__init_0)],
ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, 0, ["$_init_42", $rt_wrapFunction2(ji_PrintStream__init_0), "$write", $rt_wrapFunction3(ji_PrintStream_write), "$print1", $rt_wrapFunction1(ji_PrintStream_print0), "$print", $rt_wrapFunction1(ji_PrintStream_print1), "$println1", $rt_wrapFunction1(ji_PrintStream_println), "$println0", $rt_wrapFunction1(ji_PrintStream_println0), "$println", $rt_wrapFunction0(ji_PrintStream_println1)],
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0, 0,
g_GreenfootImage, 0, jl_Object, [], 0, 3, 0, g_GreenfootImage_$callClinit, ["$_init_", $rt_wrapFunction1(g_GreenfootImage__init_), "$_init_25", $rt_wrapFunction2(g_GreenfootImage__init_3), "$_init_35", $rt_wrapFunction1(g_GreenfootImage__init_5), "$getCopyOnWriteClone", $rt_wrapFunction0(g_GreenfootImage_getCopyOnWriteClone), "$createClone", $rt_wrapFunction1(g_GreenfootImage_createClone), "$drawToCanvas", $rt_wrapFunction3(g_GreenfootImage_drawToCanvas), "$getWidth", $rt_wrapFunction0(g_GreenfootImage_getWidth),
"$getHeight", $rt_wrapFunction0(g_GreenfootImage_getHeight), "$fill", $rt_wrapFunction0(g_GreenfootImage_fill), "$drawImage", $rt_wrapFunction3(g_GreenfootImage_drawImage), "$setColor", $rt_wrapFunction1(g_GreenfootImage_setColor), "$getTransparency", $rt_wrapFunction0(g_GreenfootImage_getTransparency), "$fillRect", $rt_wrapFunction4(g_GreenfootImage_fillRect)],
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractMap__init_)],
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, ["$getPlatformClass", $rt_wrapFunction0(jl_Class_getPlatformClass), "$isInstance", $rt_wrapFunction1(jl_Class_isInstance), "$isAssignableFrom", $rt_wrapFunction1(jl_Class_isAssignableFrom), "$getName", $rt_wrapFunction0(jl_Class_getName), "$isPrimitive0", $rt_wrapFunction0(jl_Class_isPrimitive), "$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType), "$getSuperclass", $rt_wrapFunction0(jl_Class_getSuperclass), "$newInstance1", $rt_wrapFunction0(jl_Class_newInstance)],
gc_ImageCache$CachedImageRef, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_15", $rt_wrapFunction3(gc_ImageCache$CachedImageRef__init_0), "$get1", $rt_wrapFunction0(gc_ImageCache$CachedImageRef_get)],
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Arrays__init_)],
gci_BSPNodeCache, 0, jl_Object, [], 0, 3, 0, gci_BSPNodeCache_$callClinit, ["$_init_0", $rt_wrapFunction0(gci_BSPNodeCache__init_)],
gj_MouseManager, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$_init_47", $rt_wrapFunction1(gj_MouseManager__init_0), "$newActStarted", $rt_wrapFunction0(gj_MouseManager_newActStarted), "$handleEvent1", $rt_wrapFunction1(gj_MouseManager_handleEvent), "$handleTouchEvent", $rt_wrapFunction1(gj_MouseManager_handleTouchEvent), "$handleEvent0", $rt_wrapFunction1(gj_MouseManager_handleEvent0), "$handleEvent$exported$0", $rt_wrapFunction1(gj_MouseManager_handleEvent$exported$0)],
ggim_WorldLocator, 0, jl_Object, [], 3, 3, 0, 0, 0,
gc_WorldHandler$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$_init_48", $rt_wrapFunction1(gc_WorldHandler$1__init_0), "$handleEvent1", $rt_wrapFunction1(gc_WorldHandler$1_handleEvent), "$handleEvent0", $rt_wrapFunction1(gc_WorldHandler$1_handleEvent0), "$handleEvent$exported$0", $rt_wrapFunction1(gc_WorldHandler$1_handleEvent$exported$0)],
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
g_Greenfoot, 0, jl_Object, [], 0, 3, 0, g_Greenfoot_$callClinit, ["$_init_0", $rt_wrapFunction0(g_Greenfoot__init_)],
gc_InRangeQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gc_InRangeQuery__init_0)],
gc_RepaintHandler, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
gc_WorldHandler$2, 0, jl_Object, [gc_RepaintHandler], 0, 0, 0, 0, ["$_init_48", $rt_wrapFunction1(gc_WorldHandler$2__init_0), "$doRepaint", $rt_wrapFunction0(gc_WorldHandler$2_doRepaint), "$doRepaint$exported$0", $rt_wrapFunction0(gc_WorldHandler$2_doRepaint$exported$0)],
ju_LinkedList$Entry, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_LinkedList$Entry__init_)],
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
jl_Object$monitorExit$lambda$_8_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jl_Object$monitorExit$lambda$_8_0__init_0), "$run", $rt_wrapFunction0(jl_Object$monitorExit$lambda$_8_0_run)],
g_GreenfootImage$2$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, ["$_init_22", $rt_wrapFunction2(g_GreenfootImage$2$handleEvent$lambda$_1_0__init_0), "$run", $rt_wrapFunction0(g_GreenfootImage$2$handleEvent$lambda$_1_0_run)],
ggim_PriorityManager, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ggim_PriorityManager__init_)],
jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, 0, ["$_init_14", $rt_wrapFunction3(jn_CharBuffer__init_), "$get3", $rt_wrapFunction3(jn_CharBuffer_get), "$position0", $rt_wrapFunction1(jn_CharBuffer_position)],
jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0, ["$_init_14", $rt_wrapFunction3(jn_CharBufferImpl__init_)],
jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, 0, ["$_init_43", function(var_1, var_2, var_3, var_4, var_5, var_6) { jn_CharBufferOverArray__init_0(this, var_1, var_2, var_3, var_4, var_5, var_6); }, "$getChar", $rt_wrapFunction1(jn_CharBufferOverArray_getChar)],
otcic_Console, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Thread$SleepHandler$interrupted$lambda$_1_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_30", $rt_wrapFunction1(jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_0), "$run", $rt_wrapFunction0(jl_Thread$SleepHandler$interrupted$lambda$_1_0_run)],
g_ActorVisitor, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(g_ActorVisitor__init_)],
playermenu, "playermenu", -1, g_Actor, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(playermenu__init_), "$act", $rt_wrapFunction0(playermenu_act)],
otc_ResourceSource, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otc_ResourceSource__init_)],
ju_Dictionary, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Dictionary__init_)],
ggim_MouseEventData, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ggim_MouseEventData__init_), "$init0", $rt_wrapFunction0(ggim_MouseEventData_init), "$isMousePressed", $rt_wrapFunction1(ggim_MouseEventData_isMousePressed), "$mousePressed", $rt_wrapFunction4(ggim_MouseEventData_mousePressed), "$isMouseClicked", $rt_wrapFunction1(ggim_MouseEventData_isMouseClicked), "$mouseClicked", function(var_1, var_2, var_3, var_4, var_5) { ggim_MouseEventData_mouseClicked(this, var_1, var_2, var_3, var_4,
var_5); }, "$isMouseDragged", $rt_wrapFunction1(ggim_MouseEventData_isMouseDragged), "$mouseDragged", $rt_wrapFunction4(ggim_MouseEventData_mouseDragged), "$isMouseDragEnded", $rt_wrapFunction1(ggim_MouseEventData_isMouseDragEnded), "$mouseDragEnded", $rt_wrapFunction4(ggim_MouseEventData_mouseDragEnded), "$mouseExited", $rt_wrapFunction0(ggim_MouseEventData_mouseExited), "$isMouseMoved", $rt_wrapFunction1(ggim_MouseEventData_isMouseMoved), "$mouseMoved", $rt_wrapFunction4(ggim_MouseEventData_mouseMoved), "$getActor",
$rt_wrapFunction0(ggim_MouseEventData_getActor), "$getButton", $rt_wrapFunction0(ggim_MouseEventData_getButton)],
ju_HashMap$1, 0, ju_AbstractSet, [], 0, 0, 0, 0, ["$_init_29", $rt_wrapFunction1(ju_HashMap$1__init_0), "$iterator", $rt_wrapFunction0(ju_HashMap$1_iterator)],
jl_Double, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Double_$callClinit, 0,
g_ActorSet$ListNode, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_54", $rt_wrapFunction1(g_ActorSet$ListNode__init_0), "$_init_55", $rt_wrapFunction3(g_ActorSet$ListNode__init_2), "$setHashListHead", $rt_wrapFunction1(g_ActorSet$ListNode_setHashListHead), "$remove", $rt_wrapFunction0(g_ActorSet$ListNode_remove)],
otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget, otjde_GamepadEventTarget], 3, 3, 0, 0, 0,
ge_SimulationEvent, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_16", $rt_wrapFunction2(ge_SimulationEvent__init_0), "$getType0", $rt_wrapFunction0(ge_SimulationEvent_getType)],
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0]);
$rt_metadata([ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ArrayList__init_1), "$_init_5", $rt_wrapFunction1(ju_ArrayList__init_2), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get", $rt_wrapFunction1(ju_ArrayList_get), "$size0", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add), "$remove0", $rt_wrapFunction1(ju_ArrayList_remove)],
otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0, 0,
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, 0, ["$addEventListener$exported$0", $rt_wrapFunction2(otjb_Window_addEventListener$exported$0), "$removeEventListener$exported$1", $rt_wrapFunction2(otjb_Window_removeEventListener$exported$1), "$get$exported$2", $rt_wrapFunction1(otjb_Window_get$exported$2), "$removeEventListener$exported$3", $rt_wrapFunction3(otjb_Window_removeEventListener$exported$3), "$dispatchEvent$exported$4", $rt_wrapFunction1(otjb_Window_dispatchEvent$exported$4),
"$getLength$exported$5", $rt_wrapFunction0(otjb_Window_getLength$exported$5), "$addEventListener$exported$6", $rt_wrapFunction3(otjb_Window_addEventListener$exported$6)],
jl_IllegalMonitorStateException, "IllegalMonitorStateException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalMonitorStateException__init_0)],
ju_LinkedList$SequentialListIterator, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0, ["$_init_33", $rt_wrapFunction4(ju_LinkedList$SequentialListIterator__init_0), "$hasNext", $rt_wrapFunction0(ju_LinkedList$SequentialListIterator_hasNext), "$next1", $rt_wrapFunction0(ju_LinkedList$SequentialListIterator_next), "$remove", $rt_wrapFunction0(ju_LinkedList$SequentialListIterator_remove), "$hasPrevious", $rt_wrapFunction0(ju_LinkedList$SequentialListIterator_hasPrevious), "$add2", $rt_wrapFunction1(ju_LinkedList$SequentialListIterator_add)],
gj_KeyboardManager, 0, jl_Object, [otjde_EventListener], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gj_KeyboardManager__init_), "$handleEvent2", $rt_wrapFunction1(gj_KeyboardManager_handleEvent), "$isKeyDown", $rt_wrapFunction1(gj_KeyboardManager_isKeyDown), "$getKey0", $rt_wrapFunction0(gj_KeyboardManager_getKey), "$clearLatches", $rt_wrapFunction0(gj_KeyboardManager_clearLatches), "$handleEvent0", $rt_wrapFunction1(gj_KeyboardManager_handleEvent0), "$handleEvent$exported$0", $rt_wrapFunction1(gj_KeyboardManager_handleEvent$exported$0)],
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_0", $rt_wrapFunction0(jl_String__init_1), "$_init_19", $rt_wrapFunction1(jl_String__init_3), "$_init_12", $rt_wrapFunction3(jl_String__init_4), "$_init_44", $rt_wrapFunction3(jl_String__init_6), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$startsWith0", $rt_wrapFunction2(jl_String_startsWith),
"$startsWith", $rt_wrapFunction1(jl_String_startsWith0), "$endsWith", $rt_wrapFunction1(jl_String_endsWith), "$indexOf0", $rt_wrapFunction2(jl_String_indexOf), "$indexOf", $rt_wrapFunction1(jl_String_indexOf0), "$substring", $rt_wrapFunction2(jl_String_substring), "$substring0", $rt_wrapFunction1(jl_String_substring0), "$toString", $rt_wrapFunction0(jl_String_toString), "$toCharArray", $rt_wrapFunction0(jl_String_toCharArray), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode),
"$toLowerCase0", $rt_wrapFunction0(jl_String_toLowerCase)],
otcic_StderrOutputStream, 0, otcic_ConsoleOutputStream, [], 0, 3, 0, otcic_StderrOutputStream_$callClinit, ["$write", $rt_wrapFunction3(otcic_StderrOutputStream_write)],
gp_SimulationDelegate, 0, jl_Object, [], 3, 3, 0, 0, 0,
gj_Client$2, 0, jl_Object, [gp_SimulationDelegate], 0, 0, 0, 0, ["$_init_60", $rt_wrapFunction1(gj_Client$2__init_0), "$setSpeed", $rt_wrapFunction1(gj_Client$2_setSpeed)],
gj_Client$1, 0, otc_ResourceSource, [], 0, 0, 0, 0, ["$_init_60", $rt_wrapFunction1(gj_Client$1__init_0)],
gj_Client$4, 0, jl_Object, [jn_URLStreamHandlerFactory], 0, 0, 0, 0, ["$_init_60", $rt_wrapFunction1(gj_Client$4__init_0)],
ge_SimulationListener, 0, jl_Object, [], 3, 3, 0, 0, 0,
gj_Client$3, 0, jl_Object, [ge_SimulationListener], 0, 0, 0, 0, ["$_init_64", function(var_1, var_2, var_3, var_4, var_5) { gj_Client$3__init_0(this, var_1, var_2, var_3, var_4, var_5); }, "$simulationChanged", $rt_wrapFunction1(gj_Client$3_simulationChanged)],
jl_NegativeArraySizeException, "NegativeArraySizeException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NegativeArraySizeException__init_0)],
g_TreeActorSet$TasIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_57", $rt_wrapFunction1(g_TreeActorSet$TasIterator__init_0), "$next4", $rt_wrapFunction0(g_TreeActorSet$TasIterator_next), "$hasNext", $rt_wrapFunction0(g_TreeActorSet$TasIterator_hasNext), "$next1", $rt_wrapFunction0(g_TreeActorSet$TasIterator_next0)],
jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, 0, ["$_init_45", $rt_wrapFunction3(jnci_BufferedEncoder__init_), "$encodeLoop", $rt_wrapFunction2(jnci_BufferedEncoder_encodeLoop)],
jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, ["$_init_52", $rt_wrapFunction1(jnci_UTF8Encoder__init_0), "$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF8Encoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
ju_Hashtable, 0, ju_Dictionary, [ju_Map, jl_Cloneable, ji_Serializable], 0, 3, 0, ju_Hashtable_$callClinit, ["$_init_0", $rt_wrapFunction0(ju_Hashtable__init_), "$_init_5", $rt_wrapFunction1(ju_Hashtable__init_2), "$get0", $rt_wrapFunction1(ju_Hashtable_get), "$put", $rt_wrapFunction2(ju_Hashtable_put), "$rehash", $rt_wrapFunction0(ju_Hashtable_rehash)],
ju_Properties, 0, ju_Hashtable, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Properties__init_), "$getProperty", $rt_wrapFunction1(ju_Properties_getProperty), "$load", $rt_wrapFunction1(ju_Properties_load)],
jl_NumberFormatException, "NumberFormatException", 5, jl_IllegalArgumentException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NumberFormatException__init_2), "$_init_", $rt_wrapFunction1(jl_NumberFormatException__init_0)],
gc_NeighbourCollisionQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(gc_NeighbourCollisionQuery__init_0)],
gc_WorldHandler, 0, jl_Object, [ge_SimulationListener, ggim_WorldLocator], 0, 3, 0, 0, ["$enableMouseListening", $rt_wrapFunction0(gc_WorldHandler_enableMouseListening), "$disableMouseListening", $rt_wrapFunction0(gc_WorldHandler_disableMouseListening), "$getKeyboardManager", $rt_wrapFunction0(gc_WorldHandler_getKeyboardManager), "$setInitialisingWorld", $rt_wrapFunction1(gc_WorldHandler_setInitialisingWorld), "$objectAddedToWorld", $rt_wrapFunction1(gc_WorldHandler_objectAddedToWorld), "$getWorld", $rt_wrapFunction0(gc_WorldHandler_getWorld),
"$setWorld", $rt_wrapFunction1(gc_WorldHandler_setWorld), "$repaint", $rt_wrapFunction0(gc_WorldHandler_repaint), "$addWorldListener", $rt_wrapFunction1(gc_WorldHandler_addWorldListener), "$simulationChanged", $rt_wrapFunction1(gc_WorldHandler_simulationChanged), "$hasWorld", $rt_wrapFunction0(gc_WorldHandler_hasWorld), "$discardWorld", $rt_wrapFunction0(gc_WorldHandler_discardWorld), "$getTopMostActorAt", $rt_wrapFunction2(gc_WorldHandler_getTopMostActorAt), "$getTranslatedX", $rt_wrapFunction1(gc_WorldHandler_getTranslatedX),
"$getTranslatedY", $rt_wrapFunction1(gc_WorldHandler_getTranslatedY)],
jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, jnci_UTF8Charset_$callClinit, ["$newEncoder", $rt_wrapFunction0(jnci_UTF8Charset_newEncoder)],
jl_ClassNotFoundException, "ClassNotFoundException", 5, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_ClassNotFoundException__init_)],
gj_MouseManager$1$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, ["$_init_56", $rt_wrapFunction3(gj_MouseManager$1$handleEvent$lambda$_1_0__init_0), "$run", $rt_wrapFunction0(gj_MouseManager$1$handleEvent$lambda$_1_0_run)],
jl_IllegalStateException, "IllegalStateException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalStateException__init_1), "$_init_", $rt_wrapFunction1(jl_IllegalStateException__init_2)],
ge_WorldEvent, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_50", $rt_wrapFunction1(ge_WorldEvent__init_0)],
jn_URL, 0, jl_Object, [ji_Serializable], 4, 3, 0, jn_URL_$callClinit, 0,
jl_NullPointerException, "NullPointerException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(jl_NullPointerException__init_2), "$_init_0", $rt_wrapFunction0(jl_NullPointerException__init_1)],
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, 0, ["$_init_53", $rt_wrapFunction1(otpp_AsyncCallbackWrapper__init_0), "$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
enemymenu, "enemymenu", -1, g_Actor, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(enemymenu__init_), "$act", $rt_wrapFunction0(enemymenu_act)],
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Object$Monitor__init_0)],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_HashMap$HashMapEntrySet, 0, ju_AbstractSet, [], 0, 0, 0, 0, ["$_init_29", $rt_wrapFunction1(ju_HashMap$HashMapEntrySet__init_0), "$size0", $rt_wrapFunction0(ju_HashMap$HashMapEntrySet_size), "$iterator", $rt_wrapFunction0(ju_HashMap$HashMapEntrySet_iterator)],
g_ActorSet, 0, ju_AbstractSet, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(g_ActorSet__init_), "$hashCode0", $rt_wrapFunction0(g_ActorSet_hashCode), "$add0", $rt_wrapFunction1(g_ActorSet_add), "$contains1", $rt_wrapFunction1(g_ActorSet_contains), "$contains0", $rt_wrapFunction1(g_ActorSet_contains0), "$remove1", $rt_wrapFunction1(g_ActorSet_remove), "$size0", $rt_wrapFunction0(g_ActorSet_size), "$iterator", $rt_wrapFunction0(g_ActorSet_iterator)],
smily, "smily", -1, g_Actor, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(smily__init_), "$act", $rt_wrapFunction0(smily_act), "$calculate_movement", $rt_wrapFunction0(smily_calculate_movement)],
g_WorldVisitor, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(g_WorldVisitor__init_)],
MyWorld, "MyWorld", -1, g_World, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(MyWorld__init_), "$act", $rt_wrapFunction0(MyWorld_act)],
gj_MouseManager$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$_init_39", $rt_wrapFunction1(gj_MouseManager$1__init_0), "$handleEvent1", $rt_wrapFunction1(gj_MouseManager$1_handleEvent), "$handleEvent0", $rt_wrapFunction1(gj_MouseManager$1_handleEvent0), "$handleEvent$exported$0", $rt_wrapFunction1(gj_MouseManager$1_handleEvent$exported$0)],
gj_JsActorDelegate, 0, jl_Object, [gp_ActorDelegate], 0, 3, 0, 0, ["$_init_63", $rt_wrapFunction1(gj_JsActorDelegate__init_0), "$getImage0", $rt_wrapFunction1(gj_JsActorDelegate_getImage)],
jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_6", $rt_wrapFunction1(jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_0), "$run", $rt_wrapFunction0(jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0_run)],
g_TreeActorSet, 0, ju_AbstractSet, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(g_TreeActorSet__init_0), "$iterator", $rt_wrapFunction0(g_TreeActorSet_iterator), "$size0", $rt_wrapFunction0(g_TreeActorSet_size), "$add0", $rt_wrapFunction1(g_TreeActorSet_add), "$remove1", $rt_wrapFunction1(g_TreeActorSet_remove)],
colectble, "colectble", -1, g_Actor, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(colectble__init_), "$act", $rt_wrapFunction0(colectble_act)],
game, "game", -1, g_World, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(game__init_)],
jn_BufferOverflowException, "BufferOverflowException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_BufferOverflowException__init_0)],
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray0", $rt_wrapFunction1(ju_HashMap_newElementArray), "$_init_0", $rt_wrapFunction0(ju_HashMap__init_1), "$_init_5", $rt_wrapFunction1(ju_HashMap__init_2), "$_init_58", $rt_wrapFunction2(ju_HashMap__init_4), "$clear0", $rt_wrapFunction0(ju_HashMap_clear), "$containsKey", $rt_wrapFunction1(ju_HashMap_containsKey), "$entrySet", $rt_wrapFunction0(ju_HashMap_entrySet), "$get0", $rt_wrapFunction1(ju_HashMap_get), "$getEntry",
$rt_wrapFunction1(ju_HashMap_getEntry), "$findNonNullKeyEntry", $rt_wrapFunction3(ju_HashMap_findNonNullKeyEntry), "$findNullKeyEntry", $rt_wrapFunction0(ju_HashMap_findNullKeyEntry), "$isEmpty", $rt_wrapFunction0(ju_HashMap_isEmpty), "$keySet", $rt_wrapFunction0(ju_HashMap_keySet), "$put", $rt_wrapFunction2(ju_HashMap_put), "$putImpl", $rt_wrapFunction2(ju_HashMap_putImpl), "$createHashedEntry", $rt_wrapFunction3(ju_HashMap_createHashedEntry), "$rehash0", $rt_wrapFunction1(ju_HashMap_rehash), "$rehash", $rt_wrapFunction0(ju_HashMap_rehash0),
"$remove2", $rt_wrapFunction1(ju_HashMap_remove), "$removeEntry0", $rt_wrapFunction1(ju_HashMap_removeEntry), "$size0", $rt_wrapFunction0(ju_HashMap_size)],
g_GreenfootImage$1$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, ["$_init_22", $rt_wrapFunction2(g_GreenfootImage$1$handleEvent$lambda$_1_0__init_0), "$run", $rt_wrapFunction0(g_GreenfootImage$1$handleEvent$lambda$_1_0_run)],
jl_Thread$start$lambda$_4_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_8", $rt_wrapFunction1(jl_Thread$start$lambda$_4_0__init_0), "$run", $rt_wrapFunction0(jl_Thread$start$lambda$_4_0_run)]]);
$rt_metadata([otciu_UnicodeHelper$Range, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_20", $rt_wrapFunction3(otciu_UnicodeHelper$Range__init_0)],
jnc_CoderResult, 0, jl_Object, [], 0, 3, 0, jnc_CoderResult_$callClinit, ["$_init_59", $rt_wrapFunction2(jnc_CoderResult__init_0), "$isUnderflow", $rt_wrapFunction0(jnc_CoderResult_isUnderflow), "$isOverflow", $rt_wrapFunction0(jnc_CoderResult_isOverflow), "$isError", $rt_wrapFunction0(jnc_CoderResult_isError), "$isMalformed", $rt_wrapFunction0(jnc_CoderResult_isMalformed), "$isUnmappable", $rt_wrapFunction0(jnc_CoderResult_isUnmappable), "$length", $rt_wrapFunction0(jnc_CoderResult_length)],
g_MouseInfo, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(g_MouseInfo__init_0), "$getX", $rt_wrapFunction0(g_MouseInfo_getX), "$getY", $rt_wrapFunction0(g_MouseInfo_getY), "$getActor", $rt_wrapFunction0(g_MouseInfo_getActor), "$getButton", $rt_wrapFunction0(g_MouseInfo_getButton), "$setButton", $rt_wrapFunction1(g_MouseInfo_setButton), "$setLoc", $rt_wrapFunction2(g_MouseInfo_setLoc), "$setActor", $rt_wrapFunction1(g_MouseInfo_setActor), "$setClickCount", $rt_wrapFunction1(g_MouseInfo_setClickCount)],
otcit_DoubleAnalyzer, 0, jl_Object, [], 4, 3, 0, otcit_DoubleAnalyzer_$callClinit, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NoClassDefFoundError__init_)],
win, "win", -1, g_World, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(win__init_), "$act", $rt_wrapFunction0(win_act)],
gj_Client, 0, jl_Object, [], 0, 3, 0, gj_Client_$callClinit, ["$_init_0", $rt_wrapFunction0(gj_Client__init_)],
otci_CharFlow, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_19", $rt_wrapFunction1(otci_CharFlow__init_0)],
gc_TextLabel, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_26", $rt_wrapFunction3(gc_TextLabel__init_0), "$draw", $rt_wrapFunction3(gc_TextLabel_draw), "$getX", $rt_wrapFunction0(gc_TextLabel_getX), "$getY", $rt_wrapFunction0(gc_TextLabel_getY), "$getText", $rt_wrapFunction0(gc_TextLabel_getText)],
gj_MouseManager$handleEvent$lambda$_10_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, ["$_init_40", $rt_wrapFunction3(gj_MouseManager$handleEvent$lambda$_10_0__init_0), "$run", $rt_wrapFunction0(gj_MouseManager$handleEvent$lambda$_10_0_run)],
jn_BufferUnderflowException, "BufferUnderflowException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_BufferUnderflowException__init_)],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcit_FloatAnalyzer$Result__init_0)],
jl_InterruptedException, "InterruptedException", 5, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_InterruptedException__init_0)],
ju_HashMap$EntryIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, 0, ["$_init_29", $rt_wrapFunction1(ju_HashMap$EntryIterator__init_0), "$next6", $rt_wrapFunction0(ju_HashMap$EntryIterator_next), "$next1", $rt_wrapFunction0(ju_HashMap$EntryIterator_next0)],
gci_BSPNode, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_38", $rt_wrapFunction3(gci_BSPNode__init_0), "$setChild", $rt_wrapFunction2(gci_BSPNode_setChild), "$setArea", $rt_wrapFunction1(gci_BSPNode_setArea), "$setSplitAxis", $rt_wrapFunction1(gci_BSPNode_setSplitAxis), "$setSplitPos", $rt_wrapFunction1(gci_BSPNode_setSplitPos), "$getLeftArea", $rt_wrapFunction0(gci_BSPNode_getLeftArea), "$getRightArea", $rt_wrapFunction0(gci_BSPNode_getRightArea), "$getArea", $rt_wrapFunction0(gci_BSPNode_getArea), "$getLeft", $rt_wrapFunction0(gci_BSPNode_getLeft),
"$getRight0", $rt_wrapFunction0(gci_BSPNode_getRight), "$getParent", $rt_wrapFunction0(gci_BSPNode_getParent), "$setParent", $rt_wrapFunction1(gci_BSPNode_setParent), "$getChildSide", $rt_wrapFunction1(gci_BSPNode_getChildSide), "$addActor", $rt_wrapFunction1(gci_BSPNode_addActor), "$containsActor", $rt_wrapFunction1(gci_BSPNode_containsActor), "$actorRemoved", $rt_wrapFunction1(gci_BSPNode_actorRemoved), "$isEmpty", $rt_wrapFunction0(gci_BSPNode_isEmpty), "$getActorsIterator", $rt_wrapFunction0(gci_BSPNode_getActorsIterator),
"$blankNode", $rt_wrapFunction0(gci_BSPNode_blankNode), "$areaChanged", $rt_wrapFunction0(gci_BSPNode_areaChanged)]]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = $rt_globals.Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", ": ", "\tat ", "Caused by: ", "http://www.greenfoot.org/images/greenfoot-logo.png", "Stream is closed", "String contains invalid digits: ", "String contains digits out of radix ", "The value is too big for int type: ", "String is null or empty", "Illegal radix: ", "main", "Greenfoot installation is broken - reinstalling Greenfoot might help.", "Actor not in world. An attempt was made to use the actor\'s location while it is not in the world. Either it has not yet been inserted, or it has been removed.",
"BIG_ENDIAN", "LITTLE_ENDIAN", "null", "Index out of bounds", "New position ", " is outside of range [0;", "runQueuedTasks", "0", "", "Replacement preconditions do not hold", "Action must be non-null", "you loose", "press [space] to retry", "press [enter] to goto menu", "space", "enter", "The last byte in src ", " is outside of array of size ", "Length ", " must be non-negative", "Offset ", "IGNORE", "REPLACE", "REPORT", "rgba(", ",", ")", "Filename must not be null.", "http://", "https://", "images/", "HHHHH!",
"click", "mousedown", "mouseup", "mousedrag", "mousemove", "touchstart", "touchend", "touchmove", "touchcancel", "dblclick", "mouseenter", "mouseleave", "Either src or dest is null", "The given world cannot be null.", "The last char in dst ", "ArrowLeft", "left", "ArrowUp", "up", "ArrowRight", "right", "ArrowDown", "down", " ", "Enter", "Escape", "escape", "F1", "f1", "F2", "f2", "F3", "f3", "F4", "f4", "F5", "f5", "F6", "f6", "F7", "f7", "F8", "f8", "F9", "f9", "F10", "f10", "F11", "f11", "F12", "f12", "Backspace",
"backspace", "Shift", "shift", "Control", "control", "\'", "Left", "Up", "Right", "Down", "Spacebar", "keydown", "keyup", "Invalid Unicode sequence: expected format \\uxxxx", "Invalid Unicode sequence: illegal character", "bold 25px sans-serif", "bold ", "px sans-serif", "UTF-8", "smily\'s adventure", "press [space] to start", "class.", ".image", "Cannot add null actor.", "you win", "press [space] to replay", "VGh", "Initialising...", "standalone.properties", "IOException during initialisation.", "Couldn\'t load standalone.properties",
"main.class", "Main class is: ", "scenario.lock", "true", "project.greenfoot", "Couldn\'t load project.greenfoot", "simulation.speed", "Exception instantiating world class: ", " - ", "InstantiationException instantiating world class.", "ClassNotFound loading world class: ", ".", ".wav", "audio/x-wav", ".mp3", "audio/mpeg", "Error getting content for zipfile file: "]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
var Long_eq;
var Long_ne;
var Long_gt;
var Long_ge;
var Long_lt;
var Long_le;
var Long_compare;
var Long_add;
var Long_sub;
var Long_inc;
var Long_dec;
var Long_mul;
var Long_div;
var Long_rem;
var Long_udiv;
var Long_urem;
var Long_neg;
var Long_and;
var Long_or;
var Long_xor;
var Long_shl;
var Long_shr;
var Long_shru;
var Long_not;
if (typeof $rt_globals.BigInt !== 'function') {
    Long_eq = function(a, b) {
        return a.hi === b.hi && a.lo === b.lo;
    };
    Long_ne = function(a, b) {
        return a.hi !== b.hi || a.lo !== b.lo;
    };
    Long_gt = function(a, b) {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x > y;
        }
        return (a.lo & 1) > (b.lo & 1);
    };
    Long_ge = function(a, b) {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x >= y;
        }
        return (a.lo & 1) >= (b.lo & 1);
    };
    Long_lt = function(a, b) {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x < y;
        }
        return (a.lo & 1) < (b.lo & 1);
    };
    Long_le = function(a, b) {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x <= y;
        }
        return (a.lo & 1) <= (b.lo & 1);
    };
    Long_add = function(a, b) {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo + b.lo);
        } else if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = a_lolo + b_lolo | 0;
        var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
        var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
        var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_inc = function(a) {
        var lo = a.lo + 1 | 0;
        var hi = a.hi;
        if (lo === 0) {
            hi = hi + 1 | 0;
        }
        return new Long(lo, hi);
    };
    Long_dec = function(a) {
        var lo = a.lo - 1 | 0;
        var hi = a.hi;
        if (lo ===  -1) {
            hi = hi - 1 | 0;
        }
        return new Long(lo, hi);
    };
    Long_neg = function(a) {
        return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
    };
    Long_sub = function(a, b) {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo - b.lo);
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = a_lolo - b_lolo | 0;
        var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
        var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
        var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_compare = function(a, b) {
        var r = a.hi - b.hi;
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    };
    Long_mul = function(a, b) {
        var positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = 0;
        var lohi = 0;
        var hilo = 0;
        var hihi = 0;
        lolo = a_lolo * b_lolo | 0;
        lohi = lolo >>> 16;
        lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
        hilo = hilo + (lohi >>> 16) | 0;
        lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
        hilo = hilo + (lohi >>> 16) | 0;
        hihi = hilo >>> 16;
        hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
        var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
        return positive ? result : Long_neg(result);
    };
    Long_div = function(a, b) {
        if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_divRem(a, b))[0];
    };
    Long_udiv = function(a, b) {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[0];
    };
    Long_rem = function(a, b) {
        if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
        }
        return (Long_divRem(a, b))[1];
    };
    Long_urem = function(a, b) {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[1];
    };
    function Long_divRem(a, b) {
        if (b.lo === 0 && b.hi === 0) {
            throw new $rt_globals.Error("Division by zero");
        }
        var positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        var q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
    }
    function Long_udivRem(a, b) {
        if (b.lo === 0 && b.hi === 0) {
            throw new $rt_globals.Error("Division by zero");
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        var q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return [q, a];
    }
    function Long_shiftLeft16(a) {
        return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
    }
    function Long_shiftRight16(a) {
        return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
    }
    Long_and = function(a, b) {
        return new Long(a.lo & b.lo, a.hi & b.hi);
    };
    Long_or = function(a, b) {
        return new Long(a.lo | b.lo, a.hi | b.hi);
    };
    Long_xor = function(a, b) {
        return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
    };
    Long_shl = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
        } else if (b === 32) {
            return new Long(0, a.lo);
        } else {
            return new Long(0, a.lo << b - 32);
        }
    };
    Long_shr = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
        } else if (b === 32) {
            return new Long(a.hi, a.hi >> 31);
        } else {
            return new Long(a.hi >> b - 32, a.hi >> 31);
        }
    };
    Long_shru = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
        } else if (b === 32) {
            return new Long(a.hi, 0);
        } else {
            return new Long(a.hi >>> b - 32, 0);
        }
    };
    Long_not = function(a) {
        return new Long(~a.hi, ~a.lo);
    };
    function LongInt(lo, hi, sup) {
        this.lo = lo;
        this.hi = hi;
        this.sup = sup;
    }
    function LongInt_mul(a, b) {
        var a_lolo = (a.lo & 0xFFFF) * b | 0;
        var a_lohi = (a.lo >>> 16) * b | 0;
        var a_hilo = (a.hi & 0xFFFF) * b | 0;
        var a_hihi = (a.hi >>> 16) * b | 0;
        var sup = a.sup * b | 0;
        a_lohi = a_lohi + (a_lolo >>> 16) | 0;
        a_hilo = a_hilo + (a_lohi >>> 16) | 0;
        a_hihi = a_hihi + (a_hilo >>> 16) | 0;
        sup = sup + (a_hihi >>> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup & 0xFFFF;
    }
    function LongInt_sub(a, b) {
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        a_lolo = a_lolo - b_lolo | 0;
        a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
        var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    }
    function LongInt_add(a, b) {
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        a_lolo = a_lolo + b_lolo | 0;
        a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
        var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    }
    function LongInt_inc(a) {
        a.lo = a.lo + 1 | 0;
        if (a.lo === 0) {
            a.hi = a.hi + 1 | 0;
            if (a.hi === 0) {
                a.sup = a.sup + 1 & 0xFFFF;
            }
        }
    }
    function LongInt_dec(a) {
        a.lo = a.lo - 1 | 0;
        if (a.lo ===  -1) {
            a.hi = a.hi - 1 | 0;
            if (a.hi ===  -1) {
                a.sup = a.sup - 1 & 0xFFFF;
            }
        }
    }
    function LongInt_ucompare(a, b) {
        var r = a.sup - b.sup;
        if (r !== 0) {
            return r;
        }
        r = (a.hi >>> 1) - (b.hi >>> 1);
        if (r !== 0) {
            return r;
        }
        r = (a.hi & 1) - (b.hi & 1);
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    }
    function LongInt_numOfLeadingZeroBits(a) {
        var n = 0;
        var d = 16;
        while (d > 0) {
            if (a >>> d !== 0) {
                a >>>= d;
                n = n + d | 0;
            }
            d = d / 2 | 0;
        }
        return 31 - n;
    }
    function LongInt_shl(a, b) {
        if (b === 0) {
            return;
        }
        if (b < 32) {
            a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
            a.hi = a.lo >>> 32 - b | a.hi << b;
            a.lo <<= b;
        } else if (b === 32) {
            a.sup = a.hi & 0xFFFF;
            a.hi = a.lo;
            a.lo = 0;
        } else if (b < 64) {
            a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
            a.hi = a.lo << b;
            a.lo = 0;
        } else if (b === 64) {
            a.sup = a.lo & 0xFFFF;
            a.hi = 0;
            a.lo = 0;
        } else {
            a.sup = a.lo << b - 64 & 0xFFFF;
            a.hi = 0;
            a.lo = 0;
        }
    }
    function LongInt_shr(a, b) {
        if (b === 0) {
            return;
        }
        if (b === 32) {
            a.lo = a.hi;
            a.hi = a.sup;
            a.sup = 0;
        } else if (b < 32) {
            a.lo = a.lo >>> b | a.hi << 32 - b;
            a.hi = a.hi >>> b | a.sup << 32 - b;
            a.sup >>>= b;
        } else if (b === 64) {
            a.lo = a.sup;
            a.hi = 0;
            a.sup = 0;
        } else if (b < 64) {
            a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
            a.hi = a.sup >>> b - 32;
            a.sup = 0;
        } else {
            a.lo = a.sup >>> b - 64;
            a.hi = 0;
            a.sup = 0;
        }
    }
    function LongInt_copy(a) {
        return new LongInt(a.lo, a.hi, a.sup);
    }
    function LongInt_div(a, b) {
        var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
        var sz = 1 + (bits / 16 | 0);
        var dividentBits = bits % 16;
        LongInt_shl(b, bits);
        LongInt_shl(a, dividentBits);
        var q = new LongInt(0, 0, 0);
        while (sz-- > 0) {
            LongInt_shl(q, 16);
            var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
            var digitB = b.hi >>> 16;
            var digit = digitA / digitB | 0;
            var t = LongInt_copy(b);
            LongInt_mul(t, digit);
            if (LongInt_ucompare(t, a) >= 0) {
                while (LongInt_ucompare(t, a) > 0) {
                    LongInt_sub(t, b);
                     --digit;
                }
            } else {
                while (true) {
                    var nextT = LongInt_copy(t);
                    LongInt_add(nextT, b);
                    if (LongInt_ucompare(nextT, a) > 0) {
                        break;
                    }
                    t = nextT;
                    ++digit;
                }
            }
            LongInt_sub(a, t);
            q.lo |= digit;
            LongInt_shl(a, 16);
        }
        LongInt_shr(a, bits + 16);
        return q;
    }
} else {
    Long_eq = function(a, b) {
        return a === b;
    };
    Long_ne = function(a, b) {
        return a !== b;
    };
    Long_gt = function(a, b) {
        return a > b;
    };
    Long_ge = function(a, b) {
        return a >= b;
    };
    Long_lt = function(a, b) {
        return a < b;
    };
    Long_le = function(a, b) {
        return a <= b;
    };
    Long_add = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a + b);
    };
    Long_inc = function(a) {
        return $rt_globals.BigInt.asIntN(64, a + 1);
    };
    Long_dec = function(a) {
        return $rt_globals.BigInt.asIntN(64, a - 1);
    };
    Long_neg = function(a) {
        return $rt_globals.BigInt.asIntN(64,  -a);
    };
    Long_sub = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a - b);
    };
    Long_compare = function(a, b) {
        return a < b ?  -1 : a > b ? 1 : 0;
    };
    Long_mul = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a * b);
    };
    Long_div = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a / b);
    };
    Long_udiv = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) / $rt_globals.BigInt.asUintN(64, b));
    };
    Long_rem = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a % b);
    };
    Long_urem = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) % $rt_globals.BigInt.asUintN(64, b));
    };
    Long_and = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a & b);
    };
    Long_or = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a | b);
    };
    Long_xor = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a ^ b);
    };
    Long_shl = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a << $rt_globals.BigInt(b & 63));
    };
    Long_shr = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, a >> $rt_globals.BigInt(b & 63));
    };
    Long_shru = function(a, b) {
        return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) >> $rt_globals.BigInt(b & 63));
    };
    Long_not = function(a) {
        return $rt_globals.BigInt.asIntN(64, ~a);
    };
}
var Long_add = Long_add;

var Long_sub = Long_sub;

var Long_mul = Long_mul;

var Long_div = Long_div;

var Long_rem = Long_rem;

var Long_or = Long_or;

var Long_and = Long_and;

var Long_xor = Long_xor;

var Long_shl = Long_shl;

var Long_shr = Long_shr;

var Long_shru = Long_shru;

var Long_compare = Long_compare;

var Long_eq = Long_eq;

var Long_ne = Long_ne;

var Long_lt = Long_lt;

var Long_le = Long_le;

var Long_gt = Long_gt;

var Long_ge = Long_ge;

var Long_not = Long_not;

var Long_neg = Long_neg;

function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (var i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new $rt_globals.Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new $rt_globals.Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : function(result) {
        if (result instanceof $rt_globals.Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new $rt_globals.Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    var result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        var self = this;
        var callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(function() {
            self.resume();
        });
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
function $rt_suspending() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
}
function $rt_resuming() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
}
function $rt_suspend(callback) {
    var nativeThread = $rt_nativeThread();
    if (nativeThread === null) {
        throw new $rt_globals.Error("Suspension point reached from non-threading context (perhaps, from native JS method).");
    }
    return nativeThread.suspend(callback);
}
function $rt_startThread(runner, callback) {
    (new TeaVMThread(runner)).start(callback);
}
var $rt_currentNativeThread = null;
function $rt_nativeThread() {
    return $rt_currentNativeThread;
}
function $rt_invalidPointer() {
    throw new $rt_globals.Error("Invalid recorded state");
}
main = $rt_mainStarter(gj_Client_main);
main.javaException = $rt_javaException;
(function() {
    var c;
    c = jl_Object$NotifyListenerImpl.prototype;
    c.onTimer = c.$onTimer$exported$0;
    c = gj_Client$getResourceBytes$lambda$_12_0.prototype;
    c.gotContent = c.$gotContent$exported$0;
    c = gj_Client$getResourceBytes$lambda$_12_1.prototype;
    c.gotError = c.$gotError$exported$0;
    c = gj_TouchManager.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$_init_$lambda$_1_3.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$_init_$lambda$_1_2.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$_init_$lambda$_1_1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$getResourceURL$lambda$_11_0.prototype;
    c.gotContent = c.$gotContent$exported$0;
    c = gj_Client$_init_$lambda$_1_0.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$getResourceURL$lambda$_11_1.prototype;
    c.gotError = c.$gotError$exported$0;
    c = g_GreenfootImage$2.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = g_GreenfootImage$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_MouseManager.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gc_WorldHandler$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gc_WorldHandler$2.prototype;
    c.doRepaint = c.$doRepaint$exported$0;
    c = otjb_Window.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$1;
    c.getLength = c.$getLength$exported$5;
    c.get = c.$get$exported$2;
    c.addEventListener = c.$addEventListener$exported$6;
    c.removeEventListener = c.$removeEventListener$exported$3;
    c = gj_KeyboardManager.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_MouseManager$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
})();
})(this);
