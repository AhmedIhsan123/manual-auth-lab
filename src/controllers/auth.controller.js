import {
	createUser,
	findUserByUsername,
	validatePassword,
} from "../services/user.service.js";

const loginPage = (req, res) => {
	res.render("login", {
		title: "Login",
		errors: req.query.errors || null,
	});
};

const registerPage = (req, res) => {
	res.render("register", {
		title: "Register",
		errors: req.query.errors || null,
	});
};

const register = async (req, res) => {
	const { username, password, confirm, role } = req.body;

	if (!username || !password || password !== confirm) {
		return res.redirect("/register?errors=Invalid registration details");
	}

	if (password !== confirm) {
		return res.redirect("/register?errors=Invalid registration details");
	}

	if (role !== "user" && role !== "admin") {
		return res.redirect("/register?errors=Invalid registration details");
	}

	await createUser(username, password, role);
	res.redirect("/login");
};

const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.redirect("/login?errors=Invalid credentials");
	}

	const user = await findUserByUsername(username);
	if (!user) {
		return res.redirect("/login?errors=Invalid credentials");
	}

	const isValid = await validatePassword(password, user.password);
	if (!isValid) {
		return res.redirect("/login?errors=Invalid credentials");
	}

	req.session.user = {
		userId: user.userId,
		username: user.username,
		role: user.role,
	};

	res.redirect("/dashboard");
};

export default { loginPage, registerPage, register, login };
