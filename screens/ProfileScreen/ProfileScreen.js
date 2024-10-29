import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native'
import { styles } from "./ProfileScreen.style.js";
import { faHeart, faWallet, faAddressBook, faBell, faBriefcase, faInfoCircle, faSignOutAlt, faChevronRight, faSearch, faBook, faUser } from '@fortawesome/free-solid-svg-icons';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://avatar.iran.liara.run/public/24' }} style={styles.profileImage} />
                <View style={styles.profileInfo}>
                    <View style={styles.editBox}>
                        <Text style={styles.profileName}>John Doe</Text>
                        <TouchableOpacity>
                            <Text style={styles.editText}>Edit <FontAwesomeIcon icon={faChevronRight} /></Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileDetails}>+1 - 4842989351 - johndoe@gmail.com</Text>
                </View>
            </View>
            <ScrollView style={styles.menuContainer}>
                <MenuItem icon={faHeart} title="Your favorites" description="Reorder your favorite service in a click" />
                <MenuItem icon={faWallet} title="Payments" description="Payment methods, Transaction History" />
                <MenuItem icon={faAddressBook} title="Manage Address" />
                <MenuItem icon={faBell} title="Notifications" description="View your past notifications" />
                <MenuItem icon={faBriefcase} title="Register as partner" description="Want to list your service? Register with us" />
                <MenuItem icon={faInfoCircle} title="About" description="Privacy Policy, Terms of Services, Licenses" />
                <MenuItem icon={faSignOutAlt} title="Logout" titleStyle={styles.logoutText} iconStyle={styles.logoutIcon} />
            </ScrollView>
            <View style={styles.footer}>
                <FooterItem icon={faSearch} title="Search" />
                <FooterItem icon={faBook} title="Bookings" />
                <FooterItem icon={faUser} title="Account" active />
            </View>
        </View>
    );
}

function MenuItem({ icon, title, description, titleStyle, iconStyle }) {
    return (
        <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
                <FontAwesomeIcon icon={icon} style={[styles.menuIcon, iconStyle]} />
                <View>
                    <Text style={[styles.menuTitle, titleStyle]}>{title}</Text>
                    {description && <Text style={styles.menuDescription}>{description}</Text>}
                </View>
            </View>
            <FontAwesomeIcon icon={faChevronRight} style={styles.chevronIcon} />
        </View>
    );
}

function FooterItem({ icon, title, active }) {
    return (
        <TouchableOpacity style={styles.footerItem}>
            <FontAwesomeIcon icon={icon} style={[styles.footerIcon, active && styles.activeFooterIcon]} />
            <Text style={[styles.footerText, active && styles.activeFooterText]}>{title}</Text>
        </TouchableOpacity>
    );
}

