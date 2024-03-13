export const Account = {
    async isLoggedIn() {
        return await this.getDetails() !== null;
    },

    async getDetails() {
        const response = await fetch('/api/account/logincheck');
        const details = await response.json();

        return details.isNull ? null : details;
    }
};