import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  servicesContainer: {
    marginBottom: 40,
    paddingHorizontal: 15,
  },
  locationContainer: {
    marginTop: 45,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    padding: 10,
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
  },
  servicesHeader: {
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  servicesGrid: {
    justifyContent: 'space-between',
  },
  serviceTypeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexBasis: '30%',
  },
  serviceTypeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  serviceTypeText: {
    marginTop: 5,
    fontSize: 14,
  }
});