class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateAddress(address, "Address");
        this.city = this.validateAddress(city, "City");
        this.state = this.validateAddress(state, "State");
        this.zip = this.validateZip(zip);
        this.phoneNumber = this.validatePhone(phoneNumber);
        this.email = this.validateEmail(email);
    }

    validateName(name, fieldName) {
        let nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} Invalid`);
        }
        return name;
    }

    validateAddress(value, fieldName) {
        if (value.length < 4) {
            throw new Error(`${fieldName} Invalid`);
        }
        return value;
    }

    validateZip(zip) {
        let zipRegex = /^[1-9][0-9]{5}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Invalid ZIP Code");
        }
        return zip;
    }

    validatePhone(phoneNumber) {
        let phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            throw new Error("Invalid Phone Number");
        }
        return phoneNumber;
    }

    validateEmail(email) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid Email Format");
        }
        return email;
    }
}

let addressBook = [];

function addContact(contact) {
    if (addressBook.some(c => c.firstName.toLowerCase() === contact.firstName.toLowerCase() && c.lastName.toLowerCase() === contact.lastName.toLowerCase())) {
        console.log("Duplicate Contact");
        return;
    }
    addressBook.push(contact);
}

function displayContacts() {
    addressBook.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.firstName} ${contact.lastName} - ${contact.city}, ${contact.state}`);
    });
}

function updateContact(name, updatedData) {
    let contact = addressBook.find(c => c.firstName.toLowerCase() === name.toLowerCase());
    if (contact) {
        Object.keys(updatedData).forEach(key => {
            try {
                contact[key] = contact[`validate${key.charAt(0).toUpperCase() + key.slice(1)}`](updatedData[key]);
            } catch (error) {
                console.error(error.message);
            }
        });
    } else {
        console.log("Contact Not Found");
    }
}

function deleteContact(name) {
    let index = addressBook.findIndex(c => c.firstName.toLowerCase() === name.toLowerCase());
    if (index !== -1) {
        addressBook.splice(index, 1);
    } else {
        console.log("Contact Not Found");
    }
}

function countContacts() {
    return addressBook.reduce(count => count + 1, 0);
}

function searchByCityOrState(city, state) {
    return addressBook.filter(contact => contact.city === city || contact.state === state);
}

function viewByCityOrState(city, state) {
    let result = addressBook.filter(contact => contact.city === city || contact.state === state)
        .map(contact => `${contact.firstName} ${contact.lastName}`);
    return result;
}

try {
    let contact1 = new Contact("Mokshini", "Baglekar", "Ahinsa vihar", "Bhopal", "Madhya Pradesh", "400001", "9301000083", "mokshini.baglekar@gmail.com");
    let contact2 = new Contact("Bhavesh", "Malviya", "Vijay nagar", "Indore", "Madhya Pradesh", "110001", "7690000686", "bhavesh.malviya@gmail.com");
    addContact(contact1);
    addContact(contact2);

    displayContacts();

    console.log("Contacts in Bhopal:", viewByCityOrState("Bhopal", ""));
    console.log("Contacts in Madhya Pradesh:", viewByCityOrState("", "Madhya Pradesh"));
} catch (error) {
    console.error(error.message);
}
