// Simple demo
// This variant uses SvelteKit's internal fetch API
// Useful if there is a more complex logic in the API method
// however we could simply create a function called by both places

export async function load({ fetch }) {
    const response = await fetch('/classes/api/whoami');
    const json = await response.json();
    // no static typing here
    return {
        user: json.user_id,
    }
}