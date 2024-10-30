
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateBox: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 5,
    maxHeight: 60,
  },
  dayText: {
    fontSize: 14,
    color: '#666',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedBox: {
    borderColor: '#7B61FF',
    backgroundColor: '#F3EFFF',
  },
  disabledTimeBox: {
    opacity: 0.4,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeBox: {
    width: '48%',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    fontSize: 16,
    color: '#555',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  taxText: {
    fontSize: 12,
    color: '#555',
  },
  confirmButton: {
    backgroundColor: '#7B61FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
