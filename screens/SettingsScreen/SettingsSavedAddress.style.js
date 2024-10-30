import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#7d7d7d',
    marginLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 10,
  },
  editButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButtonModal: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    flex: 1,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  // Add Modal Styles
  addModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    padding: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
    flex: 1,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
