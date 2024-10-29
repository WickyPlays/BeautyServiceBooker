import { StyleSheet } from 'react-native';
import { commonStyles } from '../../commons/common_style';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 10,
    marginTop: 30,
    zIndex: 10,
    padding: 8,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  header: {
    height: 200,
    backgroundColor: '#ddd',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.626)',
    padding: 16,
  },
  headerContent: {
    flexDirection: 'column',
  },
  salonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  salonDetails: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  headerActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionsButtons: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingCount: {
    fontSize: 12,
    color: '#555',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginHorizontal: 6,
    marginTop: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#333',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tabTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  serviceText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  selectButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedButton: {
    backgroundColor: commonStyles.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    backgroundColor: commonStyles.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 7,
    bottom: 10,
    borderRadius: 20,
  },
  selectedItemsText: {
    fontSize: 17,
    marginLeft: 4,
    color: '#fff',
  },
  btnFinishBooking: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  btnFinishBookingText: {
    color: commonStyles.primary,
    fontSize: 14,
    fontWeight: '600',
  },  
});