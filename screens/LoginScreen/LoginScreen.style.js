import { StyleSheet, Dimensions } from 'react-native';
import { commonStyles } from '../../commons/common_style';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 25,
    zIndex: 2
  },
  header: {
    position: 'absolute',
    top: 110,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mainTitleContainer: {
    flexDirection: 'row',
    gap: 5
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  signup: {
    color: commonStyles.primary,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    position: 'absolute',
    top: height * 0.45 - 100,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    padding: 9,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    width: '100%',
    backgroundColor: commonStyles.primary,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: commonStyles.primary,
    textDecorationLine: 'underline',
    marginTop: 16,
    width: '100%',
    textAlign: 'center'
  }
});
