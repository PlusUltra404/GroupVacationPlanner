import React, { useState } from "react";
import {
    Form,
    Button,
    FormGroup,
    FormControl,
    FormLabel,
  } from "react-bootstrap";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";


const CalenderModal = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("  ");
    
 const handleSubmit = (event) => {
    props.apiservice.save_event(props.username, title, props.date,content, 1,1);
    props.setModalVisible(!props.modalVisible)
    // Prevent page reload
    
  };

    
    return (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              props.setModalVisible(!props.modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={styles.modalText}>Create an Event</Text>
                <Form>
                    <FormGroup className="card-inside" controlId="title">
                    <FormLabel className="input-label">Title</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        
                        name="title"
                        placeholder=" "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup className="card-inside" controlId="content">
                    <FormLabel className="input-label">Content</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        
                        name="content"
                        placeholder=" "
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    </FormGroup>
                </Form>
                <Button
                    onClick={handleSubmit}
                    className="reg-button"
                    block
                    type="submit"
                    id="login"
                    value="login"
                >
                    Submit
                </Button>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => props.setModalVisible(!props.modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    });
    
    export default CalenderModal;