class FormUtils {
  validation = {};
  rules = {};
  data = {};

  constructor(conf = {}) {
    for (let i in conf) {
      this.data[i] = "";
      this.validation[i] = {};
      this.rules[i] = conf[i].rules;
    }
  }

  customeValidateRule(id, value, rule) {
    console.error(
      `You are using custom rules for validation without define it in your input id: ${id} value: ${value} rule: ${JSON.stringify(
        rule
      )}`
    );
  }

  changeFiledValue(fieldName, value) {
    return (this.data[fieldName] = value);
  }

  validate() {
    let isValid = true;

    for (let fieldName in this.data) {
      let fieldValue = this.data[fieldName];

      let isFieldValid = this.validateSingleField(fieldName, fieldValue);

      if (!isFieldValid) {
        isValid = false;
      }
    }

    return isValid;
  }

  validateSingleField(name, value) {
    let isValid = true;

    for (let i in this.rules[name]) {
      let rule = this.rules[name][i];

      let validateInput = this.runValidateRules(name, value, {
        code: rule
      });

      if (!validateInput) {
        isValid = validateInput;
        break;
      }
    }

    return isValid;
  }

  /**
   * Define a set of rules default for the whole project
   *
   * @param {*} rule
   */
  runValidateRules(name, value, rule) {
    let isValid;

    this.validation[name] = { errors: {} };

    switch (rule.code) {
      case "required":
        isValid = typeof value !== "undefined" && value.trim() !== "";

        if (!isValid) {
          this.validation[name].errors[rule.code] = {
            code: rule.code,
            valid: false,
            value,
            message: "Required Field"
          };

          return false;
        }

        break;

      default:
        const ruleDetails = this.customeValidateRule(name, value, rule);

        if (!ruleDetails.valid) {
          this.validation[name].errors[rule.code] = {
            code: rule.code,
            valid: false,
            value,
            message: ruleDetails.message
          };

          return false;
        }
    }

    return true;
  }
}

export default FormUtils;
