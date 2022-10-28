class StringMethods {
    formatFirstLetterToUppercase(string: String) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default new StringMethods();
