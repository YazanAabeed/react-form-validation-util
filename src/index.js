import React from "react";
import { render } from "react-dom";
import Form from "./components/Form/Form";
import Grid from "@material-ui/core/Grid";
import Input from "./components/Input/Input";
import Button from "@material-ui/core/Button";
import FormUtils from "./utils/forms/FormUtils";
import SelectField from "./components/SelectField/SelectField";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVert from "@material-ui/icons/MoreVert";

class App extends React.Component {
  constructor(props) {
    super(props);

    const conf = {
      title: {
        rules: ["required"]
      },
      firstName: {
        rules: ["required"]
      },
      lastName: {
        rules: ["required"]
      },
      country: {
        rules: ["required"]
      },
      passport: {
        rules: ["required", "passport:country"]
      }
    };

    this.formUtil = new FormUtils(conf);
    this.formUtil.customeValidateRule = this.customeValidateRule;

    this.state = {
      isValid: false
    };
  }

  validatePassportPerCountry = (passport, country) => {
    const unambiguousLetters = [
      "C",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "R",
      "T",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];

    switch (country) {
      case "FR":
        return /^(?=.*[0-9])(?=.*[CFGHJKLMNPRTVWXYZ])([CFGHJKLMNPRTVWXYZ0-9]+)$/.test(
          passport
        );
      case "BR":
        if (passport) {
          const pass = (passport[0] || "") + (passport[1] || "");
          const passF = passport.substr(2, passport.length);

          return (
            unambiguousLetters.indexOf(pass[0]) > -1 &&
            unambiguousLetters.indexOf(pass[1]) > -1 &&
            /^[0-9]{6}$/.test(passF)
          );
        }

        return false;
      default:
        return false;
    }
  };

  getPassportValidationMessagePerCountry = country => {
    switch (country) {
      case "FR":
        return "French passport not valid";
      case "BR":
        return "Brazilian passport not valid e.g: GG111111";
      default:
        return "Please choose a valid country";
    }
  };

  customeValidateRule = (id, value, rule) => {
    switch (rule.code) {
      case "passport:country":
        return {
          valid: this.validatePassportPerCountry(
            value,
            this.formUtil.data.country
          ),
          message: this.getPassportValidationMessagePerCountry(
            this.formUtil.data.country
          )
        };

      default:
        console.error(
          `You are using custom rules for validation without define it in your input id: ${id} value: ${value} rule: ${JSON.stringify(
            rule
          )}`
        );
    }

    return true;
  };

  onFormSubmit = () => {
    if (this.formUtil.validate()) {
      alert("Personal infromation saved successfully!");
    } else {
      this.setState({
        isValid: false
      });
    }
  };

  onFieldChanged = (newId, newValue) => {
    const { id, value } = { id: newId, value: newValue };

    this.setState(prevState => {
      this.formUtil.changeFiledValue(id, value);
      this.formUtil.validateSingleField(id, value);

      return {};
    });
  };

  render() {
    const titleField = {
      id: "title",
      label: "Title *",
      value: this.formUtil.data.title
    };

    const firstNameField = {
      id: "firstName",
      label: "First Name *",
      value: this.formUtil.data.firstName
    };

    const lastNameField = {
      id: "lastName",
      label: "Last Name *",
      value: this.formUtil.data.lastName
    };

    const countryField = {
      id: "country",
      label: "Country of citizenship *",
      value: this.formUtil.data.country
    };

    const passportField = {
      id: "passport",
      label: "Passport ID *",
      value: this.formUtil.data.passport
    };

    return (
      <div>
        <Form>
          <div
            style={{
              margin: "50px 0"
            }}
          />

          <h1
            style={{
              textAlign: "center",
              fontFamily: "cursive"
            }}
          >
            Personal Information
          </h1>

          <div
            style={{
              margin: "50px 0"
            }}
          />

          <Grid
            container
            spacing={40}
            alignItems="center"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} sm={4} md={3}>
              <SelectField
                errors={
                  this.formUtil.validation.title &&
                  this.formUtil.validation.title.errors
                }
                label={titleField.label}
                id={titleField.id}
                value={titleField.value}
                helperText={titleField.helperText}
                onChange={(name, value) => this.onFieldChanged(name, value)}
                items={[
                  {
                    id: "MR",
                    code: "MR",
                    value: "Mr"
                  },
                  {
                    id: "MRS",
                    code: "MRS",
                    value: "Mrs"
                  }
                ]}
                style={{
                  width: "100%"
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <Input
                errors={
                  this.formUtil.validation.firstName &&
                  this.formUtil.validation.firstName.errors
                }
                label={firstNameField.label}
                id={firstNameField.id}
                value={firstNameField.value}
                helperText={firstNameField.helperText}
                onChange={(name, value) => this.onFieldChanged(name, value)}
                style={{
                  width: "100%"
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <Input
                errors={
                  this.formUtil.validation.lastName &&
                  this.formUtil.validation.lastName.errors
                }
                label={lastNameField.label}
                id={lastNameField.id}
                value={lastNameField.value}
                helperText={lastNameField.helperText}
                onChange={(name, value) => this.onFieldChanged(name, value)}
                style={{
                  width: "100%"
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <SelectField
                errors={
                  this.formUtil.validation.country &&
                  this.formUtil.validation.country.errors
                }
                label={countryField.label}
                id={countryField.id}
                value={countryField.value}
                helperText={countryField.helperText}
                onChange={(name, value) => this.onFieldChanged(name, value)}
                items={[
                  {
                    id: "France",
                    code: "FR",
                    value: "France"
                  },
                  {
                    id: "Brazil",
                    code: "BR",
                    value: "Brazil"
                  }
                ]}
                style={{
                  width: "100%"
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} md={3}>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item xs={11}>
                  <Input
                    errors={
                      this.formUtil.validation.passport &&
                      this.formUtil.validation.passport.errors
                    }
                    label={passportField.label}
                    id={passportField.id}
                    value={passportField.value}
                    helperText={passportField.helperText}
                    onChange={(name, value) => this.onFieldChanged(name, value)}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Tooltip
                    title={(() => {
                      switch (countryField.value) {
                        case "BR":
                          return (
                            <h2>
                              - Two uppercase letters from:<br />
                              &#160;&#160;&#160;[C, F, G, H, J, K, L,M,N, P, R,
                              T, V, W, X, Y, Z ]<br />
                              - followed by 6 numerals (0-9)
                            </h2>
                          );

                        case "FR":
                          return (
                            <h2>
                              - French passport IDs contain 9 alphanumeric
                              digits <br />
                              - Chosen from numerals 0–9 and the set of
                              unambiguous letters <br />
                              &#160;&#160;&#160;[C, F, G, H, J, K, L,M,N, P, R,
                              T, V, W, X, Y, Z ]
                            </h2>
                          );

                        default:
                          return <h2>Please choose a valid country</h2>;
                      }
                    })()}
                  >
                    <MoreVert />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div
            style={{
              margin: "30px 0"
            }}
          />

          <Grid
            item
            xs={12}
            style={{
              textAlign: "center"
            }}
          >
            <Button
              variant="outlined"
              onClick={this.onFormSubmit}
              color="primary"
              size="large"
            >
              Save
            </Button>
          </Grid>
        </Form>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
