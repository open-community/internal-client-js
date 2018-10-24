// ============================================================
// Import packages
import console from 'better-console';

// ============================================================
// Functions
function getHelloMessage(name) {
    if (name) {
        return `Hello ${name} !`;
    }

    return 'Hello you !';
}

/**
 * Starting point of the application
 * @returns {string}
 */
function sayHello(name) {
    const message = getHelloMessage(name);
    console.log(message);
}

// ============================================================
// Exports
export {
    getHelloMessage,
    sayHello,
};
