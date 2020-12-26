import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../../../../../util/IntlMessages";
import XChangeItDialog from "../../../../../../../components/XChangeItDialog/index";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Button } from "@material-ui/core";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

const AddUserDialog = (props) => {
  console.log("props.openDialog", props.openDialog);
  
  const phoneRregex = /^\d{8}$/;

  const submitBtnId="submit-btn";

  const isDisabledEntity = () => {
    console.log("isSuperAdmin 2");
    return !props.isSuperAdmin();
  };

  return (
    <XChangeItDialog
      maxWidth="sm"
      title={props.title}
      open={props.openDialog}
      onClose={props.onClose}
      formSubmitionBtn={submitBtnId}
      saveActionLabel={<IntlMessages id="admin.users.add" />}
    >
      <Formik
        initialValues={{
          entityName: "",
          username: "",
          cpr: "",
          englishName: "Marwa Mohamed Ashraf Lotfy Elkaramany",
          englishJobTitle: "",
          arabicName: "",
          arabicJobTitle: "",
          phoneNumber: "",
          email: "",
          priviliges: [],
          roles:[]
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log("submitting in Formik tag", values);
          props.onSubmit(values);
        }}
        validationSchema={Yup.object().shape({
          entityName: Yup.string().required("Required"),
          cpr: Yup.string().required("Required"),
          username: Yup.string().required("Required"),
          phoneNumber: Yup.string()
            .matches(phoneRregex, "Number should be 8 Digits")
            .required("Required"),
          email: Yup.string()
            .email("Incorrect email format")
            .required("Required"),
          priviliges: Yup.array().required("At least one checkbox is required"),
          roles: Yup.array().required("At least one checkbox is required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          // console.log("let's c wuts inside" ,props);
          return (
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className="w-100 mb-2"
                    disabled={isDisabledEntity()}
                  >
                    <InputLabel htmlFor="age-simple">
                      {<IntlMessages id="admin.users.entityName" />}
                    </InputLabel>
                    <Select
                      fullWidth
                      margin="dense"
                      name="entityName"
                      value={values.entityName}
                      onBlur={handleBlur}
                      error={errors.entityName && touched.entityName}
                      helperText={
                        errors.entityName &&
                        touched.entityName &&
                        errors.entityName
                      }
                      onChange={handleChange}
                      // displayEmpty
                      className="mt-3"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid container>
                  <Grid item xs={6} style={{ paddingRight: "10px" }}>
                    <TextField
                      value=""
                      margin="dense"
                      id="name"
                      label={<IntlMessages id="admin.users.username" />}
                      type="text"
                      variant="outlined"
                      fullWidth
                      name="username"
                      value={values.username}
                      onBlur={handleBlur}
                      error={errors.username && touched.username}
                      helperText={
                        errors.username && touched.username && errors.username
                      }
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ paddingLeft: "10px" }}>
                    <TextField
                      margin="dense"
                      id="name"
                      label={<IntlMessages id="admin.users.cpr" />}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="cpr"
                      value={values.cpr}
                      onBlur={handleBlur}
                      error={errors.cpr && touched.cpr}
                      helperText={errors.cpr && touched.cpr && errors.cpr}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} style={{ paddingRight: "10px" }}>
                    <TextField
                      value="test value"
                      margin="dense"
                      id="name"
                      label={<IntlMessages id="admin.users.englishName" />}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ paddingLeft: "10px" }}>
                    <TextField
                      value="test value"
                      margin="dense"
                      id="name"
                      label={<IntlMessages id="admin.users.arabicName" />}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} style={{ paddingRight: "10px" }}>
                    <TextField
                      margin="dense"
                      id="name"
                      label={<IntlMessages id="admin.users.englishJobTitle" />}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ paddingLeft: "10px" }}>
                    <TextField
                      margin="dense"
                      id="name"
                      label={<IntlMessages id="admin.users.arabicJobTitle" />}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} style={{ paddingRight: "10px" }}>
                    <TextField
                      margin="dense"
                      id="phoneNumber"
                      label={<IntlMessages id="admin.users.phoneNumber" />}
                      variant="outlined"
                      fullWidth
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={errors.phoneNumber && touched.phoneNumber}
                      helperText={
                        errors.phoneNumber &&
                        touched.phoneNumber &&
                        errors.phoneNumber
                      }
                    />
                  </Grid>
                  <Grid item xs={6} style={{ paddingLeft: "10px" }}>
                    <TextField
                      margin="dense"
                      id="name"
                      label={<IntlMessages id="admin.users.officeNumber" />}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    margin="dense"
                    id="email"
                    name="email"
                    label={<IntlMessages id="admin.users.email" />}
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name="priviliges"
                    render={(arrayHelpers) => (
                      <div className="mb-4">
                        <FormHelperText className="text-grey">
                          {<IntlMessages id="admin.users.privileges" />}
                        </FormHelperText>
                        <FormGroup className="d-flex flex-row">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.priviliges.includes("send")}
                                onChange={(e) => {
                                  if (e.target.checked)
                                    arrayHelpers.push("send");
                                  else {
                                    const idx = values.priviliges.indexOf(
                                      "send"
                                    );
                                    arrayHelpers.remove(idx);
                                  }
                                }}
                                value="send"
                                onBlur={handleBlur}
                              />
                            }
                            label="Send"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={values.priviliges.includes("receive")}
                                onChange={(e) => {
                                  if (e.target.checked)
                                    arrayHelpers.push("receive");
                                  else {
                                    const idx = values.priviliges.indexOf(
                                      "receive"
                                    );
                                    arrayHelpers.remove(idx);
                                  }
                                }}
                                value="receive"
                                onBlur={handleBlur}
                              />
                            }
                            label="Receive"
                          />
                          {errors.priviliges &&
                            touched.priviliges &&
                            errors.priviliges && (
                              <Grid item xs={12}>
                                <FormHelperText
                                  error={
                                    errors.priviliges && touched.priviliges
                                  }
                                  id="component-helper-text"
                                >
                                  {errors.priviliges}
                                </FormHelperText>
                              </Grid>
                            )}
                        </FormGroup>
                      </div>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name="roles"
                    render={(arrayHelpers) => (
                      <div className="mb-4">
                        <FormHelperText className="text-grey">
                          {<IntlMessages id="admin.users.userType" />}
                        </FormHelperText>
                        <FormGroup className="d-flex flex-row">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.roles.includes("admin")}
                                onChange={(e) => {
                                  if (e.target.checked)
                                    arrayHelpers.push("admin");
                                  else {
                                    const idx = values.roles.indexOf(
                                      "admin"
                                    );
                                    arrayHelpers.remove(idx);
                                  }
                                }}
                                value="admin"
                                onBlur={handleBlur}
                              />
                            }
                            label="System Administrator"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={values.roles.includes("user")}
                                onChange={(e) => {
                                  if (e.target.checked)
                                    arrayHelpers.push("user");
                                  else {
                                    const idx = values.roles.indexOf(
                                      "user"
                                    );
                                    arrayHelpers.remove(idx);
                                  }
                                }}
                                value="user"
                                onBlur={handleBlur}
                              />
                            }
                            label="User"
                          />
                          {errors.roles &&
                            touched.roles &&
                            errors.roles && (
                              <Grid item xs={12}>
                                <FormHelperText
                                  error={
                                    errors.roles && touched.roles
                                  }
                                  id="component-helper-text"
                                >
                                  {errors.roles}
                                </FormHelperText>
                              </Grid>
                            )}
                        </FormGroup>
                      </div>
                    )}
                  />
                </Grid>
              </Grid>
              <Button id={submitBtnId} type="submit" hidden></Button>
            </form>
          );
        }}
      </Formik>
    </XChangeItDialog>
  );
};

export default AddUserDialog;
