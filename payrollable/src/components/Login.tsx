type LoginProps = {
    onLogin: (username: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            usernameInput: HTMLInputElement,
            passwordInput: HTMLInputElement
        }

        const username = formElements.usernameInput.value;
        const password = formElements.passwordInput.value;

        onLogin(username, password);
    }

    return (
        <form className="border rounded-1 p-4 w-75 d-flex flex-column" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="usernameInput">Username</label>
                <input className="form-control" id="usernameInput" />
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input type="password" className="form-control" id="passwordInput"/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Login</button>
        </form>
    )
}