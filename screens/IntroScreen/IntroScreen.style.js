import { StyleSheet } from "react-native";
import { commonStyles } from "../../commons/common_style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#0000008a'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  carouselItem: {
    position: 'absolute',
    bottom: '25%',
    zIndex: 3,
    width: '100%',
    paddingHorizontal: 20,
  },
  carouselText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 50,
    gap: 30
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderColor: '#FFF',
    borderWidth: 2,
    color: '#000',
    flexGrow: 1
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexGrow: 1
  },
  buttonText: {
    color: commonStyles.primary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pagination: {
    marginBottom: 15,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#8f8f8f',
    justifyContent: 'center'
  },
  paginationDotActive: {
    width: 13,
    height: 13,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center'
  }
});
