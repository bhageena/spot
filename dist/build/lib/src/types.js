"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeTable = exports.inferDiscriminator = exports.dereferenceType = exports.possibleRootTypes = exports.isNotLiteralType = exports.isLiteralType = exports.isPrimitiveType = exports.isReferenceType = exports.isUnionType = exports.isArrayType = exports.isObjectType = exports.isDateTimeType = exports.isDateType = exports.areIntLiteralTypes = exports.isIntLiteralType = exports.isInt64Type = exports.isInt32Type = exports.areFloatLiteralTypes = exports.isFloatLiteralType = exports.isDoubleType = exports.isFloatType = exports.areStringLiteralTypes = exports.isStringLiteralType = exports.isNotStringType = exports.isStringType = exports.areBooleanLiteralTypes = exports.isBooleanLiteralType = exports.isBooleanType = exports.isNotNullType = exports.isNullType = exports.referenceType = exports.unionType = exports.arrayType = exports.objectType = exports.dateTimeType = exports.dateType = exports.intLiteralType = exports.int64Type = exports.int32Type = exports.floatLiteralType = exports.doubleType = exports.floatType = exports.stringLiteralType = exports.stringType = exports.booleanLiteralType = exports.booleanType = exports.nullType = exports.TypeKind = void 0;
const assert_never_1 = __importDefault(require("assert-never"));
var TypeKind;
(function (TypeKind) {
    TypeKind["NULL"] = "null";
    TypeKind["BOOLEAN"] = "boolean";
    TypeKind["BOOLEAN_LITERAL"] = "boolean-literal";
    TypeKind["STRING"] = "string";
    TypeKind["STRING_LITERAL"] = "string-literal";
    TypeKind["FLOAT"] = "float";
    TypeKind["DOUBLE"] = "double";
    TypeKind["FLOAT_LITERAL"] = "float-literal";
    TypeKind["INT32"] = "int32";
    TypeKind["INT64"] = "int64";
    TypeKind["INT_LITERAL"] = "integer-literal";
    TypeKind["DATE"] = "date";
    TypeKind["DATE_TIME"] = "date-time";
    TypeKind["OBJECT"] = "object";
    TypeKind["ARRAY"] = "array";
    TypeKind["UNION"] = "union";
    TypeKind["REFERENCE"] = "reference";
})(TypeKind = exports.TypeKind || (exports.TypeKind = {}));
// Type builders
function nullType() {
    return {
        kind: TypeKind.NULL
    };
}
exports.nullType = nullType;
function booleanType() {
    return {
        kind: TypeKind.BOOLEAN
    };
}
exports.booleanType = booleanType;
function booleanLiteralType(value) {
    return {
        kind: TypeKind.BOOLEAN_LITERAL,
        value
    };
}
exports.booleanLiteralType = booleanLiteralType;
function stringType() {
    return {
        kind: TypeKind.STRING
    };
}
exports.stringType = stringType;
function stringLiteralType(value) {
    return {
        kind: TypeKind.STRING_LITERAL,
        value
    };
}
exports.stringLiteralType = stringLiteralType;
function floatType() {
    return {
        kind: TypeKind.FLOAT
    };
}
exports.floatType = floatType;
function doubleType() {
    return {
        kind: TypeKind.DOUBLE
    };
}
exports.doubleType = doubleType;
function floatLiteralType(value) {
    return {
        kind: TypeKind.FLOAT_LITERAL,
        value
    };
}
exports.floatLiteralType = floatLiteralType;
function int32Type() {
    return {
        kind: TypeKind.INT32
    };
}
exports.int32Type = int32Type;
function int64Type() {
    return {
        kind: TypeKind.INT64
    };
}
exports.int64Type = int64Type;
function intLiteralType(value) {
    return {
        kind: TypeKind.INT_LITERAL,
        value
    };
}
exports.intLiteralType = intLiteralType;
function dateType() {
    return {
        kind: TypeKind.DATE
    };
}
exports.dateType = dateType;
function dateTimeType() {
    return {
        kind: TypeKind.DATE_TIME
    };
}
exports.dateTimeType = dateTimeType;
function objectType(properties) {
    return {
        kind: TypeKind.OBJECT,
        properties
    };
}
exports.objectType = objectType;
function arrayType(elementType) {
    return {
        kind: TypeKind.ARRAY,
        elementType
    };
}
exports.arrayType = arrayType;
function unionType(unionTypes, discriminator) {
    return {
        kind: TypeKind.UNION,
        types: unionTypes,
        discriminator
    };
}
exports.unionType = unionType;
function referenceType(name) {
    return {
        kind: TypeKind.REFERENCE,
        name
    };
}
exports.referenceType = referenceType;
// Type guards
function isNullType(type) {
    return type.kind === TypeKind.NULL;
}
exports.isNullType = isNullType;
function isNotNullType(type) {
    return !isNullType(type);
}
exports.isNotNullType = isNotNullType;
function isBooleanType(type) {
    return type.kind === TypeKind.BOOLEAN;
}
exports.isBooleanType = isBooleanType;
function isBooleanLiteralType(type) {
    return type.kind === TypeKind.BOOLEAN_LITERAL;
}
exports.isBooleanLiteralType = isBooleanLiteralType;
function areBooleanLiteralTypes(types) {
    return areTypes(types, isBooleanLiteralType);
}
exports.areBooleanLiteralTypes = areBooleanLiteralTypes;
function isStringType(type) {
    return type.kind === TypeKind.STRING;
}
exports.isStringType = isStringType;
function isNotStringType(type) {
    return !isStringType(type);
}
exports.isNotStringType = isNotStringType;
function isStringLiteralType(type) {
    return type.kind === TypeKind.STRING_LITERAL;
}
exports.isStringLiteralType = isStringLiteralType;
function areStringLiteralTypes(types) {
    return areTypes(types, isStringLiteralType);
}
exports.areStringLiteralTypes = areStringLiteralTypes;
function isFloatType(type) {
    return type.kind === TypeKind.FLOAT;
}
exports.isFloatType = isFloatType;
function isDoubleType(type) {
    return type.kind === TypeKind.DOUBLE;
}
exports.isDoubleType = isDoubleType;
function isFloatLiteralType(type) {
    return type.kind === TypeKind.FLOAT_LITERAL;
}
exports.isFloatLiteralType = isFloatLiteralType;
function areFloatLiteralTypes(types) {
    return areTypes(types, isFloatLiteralType);
}
exports.areFloatLiteralTypes = areFloatLiteralTypes;
function isInt32Type(type) {
    return type.kind === TypeKind.INT32;
}
exports.isInt32Type = isInt32Type;
function isInt64Type(type) {
    return type.kind === TypeKind.INT64;
}
exports.isInt64Type = isInt64Type;
function isIntLiteralType(type) {
    return type.kind === TypeKind.INT_LITERAL;
}
exports.isIntLiteralType = isIntLiteralType;
function areIntLiteralTypes(types) {
    return areTypes(types, isIntLiteralType);
}
exports.areIntLiteralTypes = areIntLiteralTypes;
function isDateType(type) {
    return type.kind === TypeKind.DATE;
}
exports.isDateType = isDateType;
function isDateTimeType(type) {
    return type.kind === TypeKind.DATE_TIME;
}
exports.isDateTimeType = isDateTimeType;
function isObjectType(type) {
    return type.kind === TypeKind.OBJECT;
}
exports.isObjectType = isObjectType;
function isArrayType(type) {
    return type.kind === TypeKind.ARRAY;
}
exports.isArrayType = isArrayType;
function isUnionType(type) {
    return type.kind === TypeKind.UNION;
}
exports.isUnionType = isUnionType;
function isReferenceType(type) {
    return type.kind === TypeKind.REFERENCE;
}
exports.isReferenceType = isReferenceType;
function isPrimitiveType(type) {
    switch (type.kind) {
        case TypeKind.NULL:
        case TypeKind.BOOLEAN:
        case TypeKind.BOOLEAN_LITERAL:
        case TypeKind.STRING:
        case TypeKind.STRING_LITERAL:
        case TypeKind.FLOAT:
        case TypeKind.DOUBLE:
        case TypeKind.FLOAT_LITERAL:
        case TypeKind.INT32:
        case TypeKind.INT64:
        case TypeKind.INT_LITERAL:
        case TypeKind.DATE:
        case TypeKind.DATE_TIME:
            return true;
        case TypeKind.OBJECT:
        case TypeKind.ARRAY:
        case TypeKind.UNION:
        case TypeKind.REFERENCE:
            return false;
        default:
            throw assert_never_1.default(type);
    }
}
exports.isPrimitiveType = isPrimitiveType;
function isLiteralType(type) {
    return (isBooleanLiteralType(type) ||
        isStringLiteralType(type) ||
        isFloatLiteralType(type) ||
        isIntLiteralType(type));
}
exports.isLiteralType = isLiteralType;
function isNotLiteralType(type) {
    return !isLiteralType(type);
}
exports.isNotLiteralType = isNotLiteralType;
// Guard helpers
function areTypes(types, predicate) {
    return types.every(predicate);
}
// Type helpers
function possibleRootTypes(type, typeTable) {
    if (isReferenceType(type)) {
        return possibleRootTypes(typeTable.getOrError(type.name).type, typeTable);
    }
    if (isUnionType(type)) {
        return type.types.reduce((acc, curr) => acc.concat(possibleRootTypes(curr, typeTable)), []);
    }
    return [type];
}
exports.possibleRootTypes = possibleRootTypes;
function dereferenceType(type, typeTable) {
    if (isReferenceType(type)) {
        return dereferenceType(typeTable.getOrError(type.name).type, typeTable);
    }
    return type;
}
exports.dereferenceType = dereferenceType;
/**
 * Given a list of types, try to find a disriminator. The null type is ignored.
 *
 * @param types list of types
 * @param typeTable a TypeTable
 */
function inferDiscriminator(types, typeTable) {
    const concreteRootTypesExcludingNull = types
        .reduce((acc, type) => {
        return acc.concat(...possibleRootTypes(type, typeTable));
    }, [])
        .filter(isNotNullType);
    const possibleDiscriminators = new Map();
    for (const type of concreteRootTypesExcludingNull) {
        if (!isObjectType(type)) {
            // Only objects will have discriminator properties
            return;
        }
        for (const property of type.properties) {
            if (property.optional) {
                // Optional properties cannot be considered for discriminators
                continue;
            }
            const dereferencedPropertyType = dereferenceType(property.type, typeTable);
            if (isStringLiteralType(dereferencedPropertyType)) {
                const current = possibleDiscriminators.get(property.name);
                possibleDiscriminators.set(property.name, (current !== null && current !== void 0 ? current : []).concat({
                    value: dereferencedPropertyType.value,
                    type
                }));
            }
        }
    }
    const candidateDiscriminators = [];
    for (const candidate of possibleDiscriminators.keys()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const values = possibleDiscriminators.get(candidate);
        if (new Set(values.map(v => v.value)).size !==
            concreteRootTypesExcludingNull.length) {
            continue;
        }
        candidateDiscriminators.push(candidate);
    }
    // Multiple candidates means the a discriminator is ambiguous and therefore can't be determined
    return candidateDiscriminators.length === 1
        ? candidateDiscriminators[0]
        : undefined;
}
exports.inferDiscriminator = inferDiscriminator;
/**
 * Loci table is a lookup table for types.
 */
class TypeTable {
    constructor(types = new Map()) {
        this.typeDefs = types;
    }
    /**
     * Retrieve the number of entries in the type table.
     */
    get size() {
        return this.typeDefs.size;
    }
    static fromArray(typeTableArr) {
        const entries = typeTableArr.reduce((acc, t) => {
            acc.push([t.name, t.typeDef]);
            return acc;
        }, []);
        return new TypeTable(new Map(entries));
    }
    /**
     * Return an object representation of the type table.
     */
    toArray() {
        const arr = new Array();
        this.typeDefs.forEach((typeDef, key) => {
            arr.push({ name: key, typeDef });
        });
        return arr.sort((a, b) => (b.name > a.name ? -1 : 1));
    }
    /**
     * Add a type to the type table. If the type key is already present, `add` will throw an error.
     *
     * @param key lookup key
     * @param typeDef target type definition
     */
    add(key, typeDef) {
        if (this.typeDefs.has(key)) {
            throw new Error(`Key already present in type table: ${key}`);
        }
        this.typeDefs.set(key, typeDef);
    }
    /**
     * Retrieve a type by lookup key.
     *
     * @param key lookup key
     */
    get(key) {
        return this.typeDefs.get(key);
    }
    /**
     * Retrieve a type by lookup key.
     *
     * @param key lookup key
     */
    getOrError(key) {
        const typeDef = this.get(key);
        if (typeDef === undefined) {
            throw new Error(`Key not present in type table: ${key}`);
        }
        return typeDef;
    }
    /**
     * Check if a type exists in the table.
     *
     * @param key lookup key
     */
    exists(key) {
        return this.typeDefs.has(key);
    }
}
exports.TypeTable = TypeTable;
