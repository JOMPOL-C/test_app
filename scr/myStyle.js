import { StyleSheet } from "react-native";

export const myStyle=StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  image: { 
    width: 80, 
    height: 80, 
    borderRadius: 10, 
    marginRight: 10 
  },
  infoContainer: { 
    flex: 1 },
  title: { 
    fontSize: 16, 
    fontWeight: "bold" },
  price: { 
    color: "green" },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 10 },
  addButton: { 
    backgroundColor: "blue", 
    padding: 5, 
    borderRadius: 5 },
  statusButton: { 
    padding: 5, 
    borderRadius: 5 },
  cartContainer: { 
    padding: 10, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    marginTop: 20 },
  cartTitle: { 
    fontSize: 18, 
    fontWeight: "bold" },
  cartItem: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingVertical: 5 },
  removeButton: { 
    backgroundColor: "red", 
    paddingVertical: 3, 
    paddingHorizontal: 10, 
    borderRadius: 5 },
  removeButtonText: { 
    color: "#fff" },
  cartButtonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartTitleContainer: {
    flexDirection: "row",  
    justifyContent: "space-between",  
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  editbutton: {
    height: 40,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  editbutton: {
    height: 40,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: "100%",
  },
  imagePickerButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 0,
    marginLeft: 10,
  }
  }
  )