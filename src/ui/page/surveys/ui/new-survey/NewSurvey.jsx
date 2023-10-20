import React, { useState, useEffect } from "react";
import { Input, Form, Select, Button, Table, ColorPicker, Space, Col, Row } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import ThematicMapPage from "../map/ThematicMapPage";
import formDataJson from "../../../../../../public/data/2-create-form/form-settings.json"; // Directly import the JSON data

export default function NewSurvey() {
  const [formData, setFormData] = useState(formDataJson); // Use the imported JSON data directly
  const [answers, setAnswers] = useState([]);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentText, setCurrentText] = useState("");
  const [validationError, setValidationError] = useState({ text: false, color: false });
  const [isMinimized, setIsMinimized] = useState(window.innerWidth <= 768); // Assuming 768px as the breakpoint for mobile screens

  const btnStyle = {
    backgroundColor: "yellow",
    color: "black",
    borderColor: validationError.color ? "red" : undefined,
  };
  let colorError = currentColor === "#000000";

  const formItemStyle = {
    marginBottom: "10px",
  };
  const labelStyle = {
    marginBottom: "-10px",
  };

  const handleAddToList = () => {
    let textError = !currentText.trim();
    let colorError = currentColor === "#000000";

    setValidationError({ text: textError, color: colorError });

    if (textError || colorError) {
      return;
    }

    setAnswers((prevAnswers) => [...prevAnswers, { text: currentText, color: currentColor.toHexString() }]);
    setCurrentText("");
    setCurrentColor("#000000");
  };

  if (!formData) return <div>Loading...</div>;

  useEffect(() => {
    const handleResize = () => {
      setIsMinimized(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Row style={{ padding: "0px 0px", position: "absolute", top: "50px", width: "100%" }}>
      {isMinimized ? (
        <>
          <Col span={24} style={{ height: "300px", padding: "10px" }}>
            <ThematicMapPage />
          </Col>
          <Col
            span={24}
            style={{ overflowY: "scroll", maxHeight: "calc(100vh - 410px)", padding: "0px 20px 70px 20px" }}>
            <h2>{formData.title}</h2>
            <Form>
              {formData.fields.map((field) => {
                switch (field.type) {
                  case "input-text":
                    return (
                      <Form.Item
                        style={formItemStyle}
                        label={field.label}
                        required={field.required}
                        labelCol={{ span: 24, style: labelStyle }}
                        wrapperCol={{ span: 24 }}>
                        <Input placeholder={field.placeholder} />
                      </Form.Item>
                    );
                  case "textarea":
                    return (
                      <Form.Item
                        style={formItemStyle}
                        label={field.label}
                        required={field.required}
                        labelCol={{ span: 24, style: labelStyle }}
                        wrapperCol={{ span: 24 }}>
                        <Input.TextArea placeholder={field.placeholder} />
                      </Form.Item>
                    );
                  case "select":
                    return (
                      <Form.Item
                        style={formItemStyle}
                        label={field.label}
                        required={field.required}
                        labelCol={{ span: 24, style: labelStyle }}
                        wrapperCol={{ span: 24 }}>
                        <Select>
                          {field.data.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                              {option.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    );
                  case "SpecialComponent1":
                    return (
                      <div key={field.field}>
                        <Form.Item
                          style={formItemStyle}
                          label={field.label}
                          labelCol={{ span: 24, style: labelStyle }}
                          wrapperCol={{ span: 24 }}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Input
                              value={currentText}
                              onChange={(e) => setCurrentText(e.target.value)}
                              placeholder="Enter name"
                              style={{ width: "50%", borderColor: validationError.text ? "red" : undefined }}
                            />

                            <ColorPicker value={currentColor} onChange={(color) => setCurrentColor(color)}>
                              <Button type="primary" style={btnStyle}>
                                Choose Color
                              </Button>
                            </ColorPicker>

                            <Button onClick={handleAddToList}>Add to List</Button>
                          </div>
                        </Form.Item>
                        <Table
                          dataSource={answers}
                          columns={[
                            {
                              title: "Color",
                              dataIndex: "color",
                              key: "color",
                              render: (color) => <span style={{ color: color }}>{color}</span>,
                            },
                            { title: "Answers", dataIndex: "text", key: "text" },
                            {
                              title: "Operations",
                              key: "operations",
                              render: () => (
                                <div style={{ display: "flex", gap: "10px" }}>
                                  <DeleteFilled />
                                  <EditFilled />
                                </div>
                              ),
                            },
                          ]}
                        />
                        <Button style={{ float: "right", marginTop: "10px" }}>Save</Button>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </Form>
          </Col>
        </>
      ) : (
        <>
          <Col
            span={6}
            style={{ padding: "0px 0px 0px 20px", width: "500px", display: "flex", flexDirection: "column" }}>
            <h2>{formData.title}</h2>
            <Form>
              {formData.fields.map((field) => {
                switch (field.type) {
                  case "input-text":
                    return (
                      <Form.Item
                        style={formItemStyle}
                        label={field.label}
                        required={field.required}
                        labelCol={{ span: 24, style: labelStyle }}
                        wrapperCol={{ span: 24 }}>
                        <Input placeholder={field.placeholder} />
                      </Form.Item>
                    );
                  case "textarea":
                    return (
                      <Form.Item
                        style={formItemStyle}
                        label={field.label}
                        required={field.required}
                        labelCol={{ span: 24, style: labelStyle }}
                        wrapperCol={{ span: 24 }}>
                        <Input.TextArea placeholder={field.placeholder} />
                      </Form.Item>
                    );
                  case "select":
                    return (
                      <Form.Item
                        style={formItemStyle}
                        label={field.label}
                        required={field.required}
                        labelCol={{ span: 24, style: labelStyle }}
                        wrapperCol={{ span: 24 }}>
                        <Select>
                          {field.data.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                              {option.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    );
                  case "SpecialComponent1":
                    return (
                      <div key={field.field}>
                        <Form.Item
                          style={formItemStyle}
                          label={field.label}
                          labelCol={{ span: 24, style: labelStyle }}
                          wrapperCol={{ span: 24 }}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Input
                              value={currentText}
                              onChange={(e) => setCurrentText(e.target.value)}
                              placeholder="Enter name"
                              style={{ width: "50%", borderColor: validationError.text ? "red" : undefined }}
                            />

                            <ColorPicker value={currentColor} onChange={(color) => setCurrentColor(color)}>
                              <Button type="primary" style={btnStyle}>
                                Choose Color
                              </Button>
                            </ColorPicker>

                            <Button onClick={handleAddToList}>Add to List</Button>
                          </div>
                        </Form.Item>
                        <Table
                          dataSource={answers}
                          columns={[
                            {
                              title: "Color",
                              dataIndex: "color",
                              key: "color",
                              render: (color) => <span style={{ color: color }}>{color}</span>,
                            },
                            { title: "Answers", dataIndex: "text", key: "text" },
                            {
                              title: "Operations",
                              key: "operations",
                              render: () => (
                                <div style={{ display: "flex", gap: "10px" }}>
                                  <DeleteFilled />
                                  <EditFilled />
                                </div>
                              ),
                            },
                          ]}
                        />
                        <Button style={{ float: "right", marginTop: "10px" }}>Save</Button>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </Form>
          </Col>
          <Col span={18} style={{ width: "100%", height: "90vh", padding: "10px" }}>
            <ThematicMapPage />
          </Col>
        </>
      )}
    </Row>
  );
}
