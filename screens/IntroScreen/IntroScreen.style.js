import { StyleSheet } from "react-native";

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
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderColor: '#000',
    color: '#000'
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
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
    backgroundColor: '#606060',
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
