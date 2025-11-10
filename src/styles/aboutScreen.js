import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appInfoSection: {
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  memberRole: {
    fontSize: 13,
    color: '#666',
  },
  sectionIcon: {
  width: 24,
  height: 24,
  marginRight: 8,
},
  techText: {
    fontSize: 15,
    color: '#666',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  contactText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 15,
  },
  footerText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 5,
  },
});