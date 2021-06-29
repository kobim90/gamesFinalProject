import { getUserApi } from "../../DAL/api";

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
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
};

function validationChecks(name, value, userData) {
  const showErrors = [];
  const { validations } = userData[name];
  let background = "";

  if (validations.required && !value) {
    showErrors.push(`${name} is required`);
    background = "alert-danger";
  }
  if (!validations.pattern.test(value)) {
    console.log(value);
    showErrors.push(`${validations.requirments}`);
    background = "alert-danger";
  }

  if (name === "paswordConfirm") {
    if (value !== userData.password.value) {
      showErrors.push(`password doesnt match, please recheck your password`);
      background = "alert-danger";
    }
  }

  if (name === "username" && value !== "") {
    if (getUserApi(name)) {
      showErrors.push(`${value} allready exists, choose a different username`);
      background = "alert-danger";
    }
  }

  return [showErrors, background];
}

export { validationObj, validationChecks };
