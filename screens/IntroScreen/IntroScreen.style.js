import { StyleSheet } from "react-native";
import { commonStyles } from "../../commons/common_style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',  // Ensure background color is set to black for better image contrast
  },
  imageCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#00000080',  // Slightly lighter opacity for better visibility of image
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',  // Adjusted to center the text better vertically
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,  // Reduced top padding for better centering
  },
  carouselItem: {
    position: 'absolute',
    bottom: '30%',  // Adjusted bottom for more consistency across screen sizes
    zIndex: 3,
    width: '100%',
    paddingHorizontal: 20,
  },
  carouselText: {
    color: '#fff',
    fontSize: 32,  // Slightly reduced font size for better fit
    fontWeight: 'bold',
    textAlign: 'center',  // Centered text for a cleaner look
    paddingHorizontal: 10,  // Added padding to avoid text touching screen edges
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  // Better alignment for buttons across all screen sizes
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,  // Adjusted for more consistent bottom spacing
    gap: 20,  // Reduced gap for a tighter layout
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderColor: '#FFF',
    borderWidth: 2,
    flexGrow: 1,
    alignItems: 'center',  // Ensures text stays centered
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
    flexGrow: 1,
    alignItems: 'center',  // Ensures text stays centered
  },
  buttonText: {
    color: commonStyles.primary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pagination: {
    marginBottom: 20,  // Adjusted for better spacing with buttons
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,  // Reduced gap for pagination dots
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#8f8f8f',
  },
  paginationDotActive: {
    width: 12,  // Slightly larger active dot
    height: 12,
    borderRadius: 50,
    backgroundColor: '#FFF',
  }
});
