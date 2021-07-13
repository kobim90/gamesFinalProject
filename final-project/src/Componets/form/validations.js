import { getUserByUsername } from "../../DAL/api";

const validationObj = {
  username: {
    value: "",
    errors: [],
    background: "",
    validations: {
      required: true,
      pattern: /^[0-9a-zA-Z]{2,}$/,
      requirments: "username should be no less than 2 characters",
    },
  },
  email: {
    value: "",
    errors: [],
    background: "",
    validations: {
      required: true,
      pattern:
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      requirments: "email should be valid email (xxx@yyy.zzz)",
    },
  },
  password: {
    value: "",
    errors: [],
    background: "",
    validations: {
      required: true,
      pattern: /^[a-zA-Z0-9]{8,}$/,
      requirments: [
        "password should be no less than 8 characters",
        " password should include small, large characters and numbers",
      ],
    },
  },
  passwordConfirm: {
    value: "",
    errors: [],
    background: "",
    validations: {
      required: true,
      pattern: /^[a-zA-Z0-9]{8,}$/,
      requirments: "password does not match",
    },
  },
  img: {
    value: "placeholder.jpg",
    errors: [],
    background: "",
    validations: {
      required: false,
      pattern: /[\/.](gif|jpg|jpeg|tiff|png)$/,
      requirments: "Please enter a valid img",
    },
  },
};

async function validationChecks(name, value, userData, type) {
  const showErrors = [];
  const { validations } = userData[name];
  let background = "";

  if (validations.required && !value) {
    showErrors.push(`${name} is required`);
    background = "alert-danger";
  }
  if (!validations.pattern.test(value) && name !== "genres" && value) {
    showErrors.push(`${validations.requirments}`);
    background = "alert-danger";
  }
  if (name === "passwordConfirm") {
    if (value !== userData.password.value) {
      showErrors.push(`password doesnt match, please recheck your password`);
      background = "alert-danger";
    }
  }
  if (type === "register") {
    if (name === "username" && value !== "") {
      const data = await getUserByUsername(value)
        if (data[0]) {
          showErrors.push(`${value} allready exists, choose a different username`);
          background = "alert-danger";
        }
    }
  }

  return [showErrors, background];
}

export { validationObj, validationChecks };
