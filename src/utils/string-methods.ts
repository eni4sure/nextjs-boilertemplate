class StringMethods {
    formatFirstLetterToUppercase(string: String) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

const stringMethods = new StringMethods();

export default stringMethods;
