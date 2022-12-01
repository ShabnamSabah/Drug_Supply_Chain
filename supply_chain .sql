-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2021 at 05:42 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supply_chain`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `mfr_id` int(11) DEFAULT NULL,
  `lab_id` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `mfr_id`, `lab_id`, `productId`) VALUES
(1, 1, 11, 1),
(2, 1, 6, 2),
(3, 1, 11, 3),
(4, 1, 4, 4),
(5, 3, 11, 5),
(6, 3, 8, 6),
(7, 3, 11, 7),
(8, 1, 4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `d_orders`
--

CREATE TABLE `d_orders` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `m_confirm` varchar(255) DEFAULT 'No',
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_orders`
--

INSERT INTO `d_orders` (`id`, `quantity`, `phone_number`, `address`, `m_confirm`, `userId`, `productId`) VALUES
(1, 2, '01621560343', 'Uap', 'Yes', 5, 4),
(2, 3, '01621560343', 'Uap', 'Yes', 5, 6),
(3, 2, '01621560343', 'Uap', 'Reject', 5, 1),
(4, 3, '01621560343', 'Uap', 'Reject', 5, 5),
(5, 2, '01717697167', 'Green Road', 'Yes', 10, 1),
(6, 2, '01717697167', 'Green Road', 'Yes', 10, 5),
(7, 3, '01717697167', 'Green Road', 'Reject', 10, 4),
(8, 3, '01717697167', 'Green Road', 'Reject', 10, 6);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_company` varchar(255) DEFAULT NULL,
  `product_details` varchar(255) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `assigned` varchar(255) DEFAULT 'No',
  `lab_approved` varchar(255) DEFAULT 'No',
  `approved` varchar(255) DEFAULT 'No',
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_company`, `product_details`, `product_price`, `assigned`, `lab_approved`, `approved`, `userId`) VALUES
(1, 'Deflux', 'Beximco ', 'Mfg. Lic. No: 379 & 119, Batch No: 19270, Mfg Date:  OCT 2019, Exp Date:  SEP 2021', 300, 'Yes', 'Yes', 'Yes', 1),
(2, 'Zolfin', 'Beximco', 'Mfg. Lic. No: 379 & 119, Batch No:  SD1416, Mfg Date:  SEP 2020, Exp Date:  AUG 2022', 350, 'Yes', 'Reject', 'Reject', 1),
(3, 'Intracef', 'Beximco ', 'Mfg. Lic. No: 379 & 119, Batch No:  ECK001, Mfg Date: NOV 2019, Exp Date: OCT 2022\r\n                        ', 400, 'Yes', 'Reject', 'Reject', 1),
(4, 'Napa', 'Beximco', 'Mfg. Lic. No: 379 & 119, Batch No:  SEC259, Mfg Date: MAR 2021, Exp Date: FEB 2024\r\n', 250, 'Yes', 'Yes', 'Yes', 1),
(5, 'Nebanol', 'Square', 'Mfg. Lic. No: 33 & 114, Batch No: 1C01353, Mfg Date:  MAR 2021, Exp Date:  FEB 2024', 100, 'Yes', 'Yes', 'Yes', 3),
(6, 'Nexum', 'Square', 'Mfg. Lic. No: 235 & 460, Batch No: 1A03459, Mfg Date:  JAN 2021, Exp Date: DEC 2022', 400, 'Yes', 'Yes', 'Yes', 3),
(7, 'LansoD', 'Square', 'Mfg. Lic. No: 235 & 460, Batch No: 0B01017, Mfg Date:  JAN 2020, Exp Date: DEC 2021', 350, 'Yes', 'Reject', 'Reject', 3),
(8, 'Acifix', 'Beximco ', 'Mfg. Lic. No: 379 & 119, Batch No: 11114522, Mfg Date: MAY 2021, Exp Date: APR 2022', 100, 'Yes', 'Yes', 'Yes', 1);

-- --------------------------------------------------------

--
-- Table structure for table `p_orders`
--

CREATE TABLE `p_orders` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `r_confirm` varchar(255) DEFAULT 'No',
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `rOrderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `p_orders`
--

INSERT INTO `p_orders` (`id`, `quantity`, `phone_number`, `address`, `r_confirm`, `userId`, `productId`, `rOrderId`) VALUES
(1, 1, '01756413883', 'Canada', 'Yes', 13, 4, 1),
(2, 1, '01756413883', 'Canada', 'Reject', 13, 5, 4),
(3, 1, '01756413883', 'Canada', 'Yes', 13, 6, 7),
(4, 1, '01756413883', 'Canada', 'Reject', 13, 1, 6),
(5, 1, '01715415875', 'Central Road', 'Yes', 14, 5, 4),
(6, 2, '01715415875', 'Central Road', 'Reject', 14, 6, 7),
(7, 2, '01715415875', 'Central Road', 'Yes', 14, 1, 6),
(8, 1, '01715415875', 'Central Road', 'Reject', 14, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `r_orders`
--

CREATE TABLE `r_orders` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `d_confirm` varchar(255) DEFAULT 'No',
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `dOrderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `r_orders`
--

INSERT INTO `r_orders` (`id`, `quantity`, `phone_number`, `address`, `d_confirm`, `userId`, `productId`, `dOrderId`) VALUES
(1, 2, '01716177441', 'Jigatola', 'Yes', 7, 4, 1),
(2, 2, '01716177441', 'Jigatola', 'Reject', 7, 6, 2),
(3, 1, '01716177441', 'Jigatola', 'Reject', 7, 1, 5),
(4, 1, '01716177441', 'Jigatola', 'Yes', 7, 5, 6),
(5, 1, '01682065594', 'Dhanmondi', 'Reject', 12, 5, 6),
(6, 1, '01682065594', 'Dhanmondi', 'Yes', 12, 1, 5),
(7, 2, '01682065594', 'Dhanmondi', 'Yes', 12, 6, 2),
(8, 2, '01682065594', 'Dhanmondi', 'Reject', 12, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `usertype` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `usertype`) VALUES
(1, 'Beximco ', 'tarannum.cse@gmail.com', '$2a$10$fN7kAC3V.jQWG941ygrMk.bj0ZM5E3iuZkjV6En7JGeuUaUuCtGu6', 'Manufacturer'),
(2, 'Touhid', 'touhid@gmail.com', '$2a$10$PLH2PEOCAsGvTlAKDotJteS./XKVAWlGlHTN8zGW8wzS6TFMTSB6K', 'Administrator'),
(3, 'Square', 'sabatarannum@rocketmail.com', '$2a$10$oQt5st1g7eqRxKbc8YPXc.Nb7Y1ePVSDF.NPx8CQpqH5znWiyRnea', 'Manufacturer'),
(4, 'Sara', 'sara@gmail.com', '$2a$10$o4Ws5oaC7J7DaxBcrBrLEuBKZhx2lO4BKw8pb2JL36.A9MXAy3TVa', 'Laboratory'),
(5, 'Apubra', 'apurba@gmail.com', '$2a$10$tdBJclH6qVAcVfhA5VOmfuSk1/6tugNcTHiK3vGMQH9WxoWjG.pkm', 'Distributor'),
(6, 'Sadia', 'sadia@gmail.com', '$2a$10$21/YsWFeybdERYu8XWXzKOGYRwUiTeo5Dgdb1uSa78A4RJsCD/Fqq', 'Laboratory'),
(7, 'Tanvir', 'tanvir@gmail.com', '$2a$10$vFPQJ3hN4Co7dvDCyms4eeU7NVWXYDq6gvjEk2xx5o4zkvT6uHPSG', 'Retailer'),
(8, 'Snigdha', 'snigdha@gmail.com', '$2a$10$1GrQj4DaTWpbtznzwlb75Ok9gKTFa0g1HtSe72Z2BE.Y2hD.3A8NG', 'Laboratory'),
(9, 'Warafta', 'warafta@gmail.com', '$2a$10$vFTcYLYMKBSYCTBwJ3WazOH.PeCGg5dV31Sr0TjL9AzvOOvh36z7O', 'Laboratory'),
(10, 'Tanim', 'rahat_424@yahoo.com', '$2a$10$.C1XQNW4xqeLDGY3A8TFn.fcdO0S1nyOwsbpT0wsZ.IVqSA3TyQO6', 'Distributor'),
(11, 'Efrana', 'efrana@gmail.com', '$2a$10$IgJgnO5HDA4ifw2.FTiTIedf.N/t25VyVw2zpRdy6ZJG82wy3i6lC', 'Laboratory'),
(12, 'Ador', 'ador@gmail.com', '$2a$10$jP5ZePYYXsqXjc0RwixudO7GRhPXeVOsF.HROeFsY2XIwD1j3ed8u', 'Retailer'),
(13, 'Zannat', 'zannat@gmail.com', '$2a$10$qHlQKnFv2kEKSAnaSnjFyOXLwoKQo6fyOHRJrLfRC0.HK9rcJfB4.', 'Patient'),
(14, 'Tahiya', 'tahiya@gmail.com', '$2a$10$sZRu5zE1P0X8Xg.6gAbCvu0h8wJy9HYhxQHiWeFR0oqIz.RtmON1m', 'Patient'),
(15, 'Gulbahar', 'gulbahar@gmail.com', '$2a$10$2VfxZ2Y/m2E3TAosSwtbF.FEyOHY/H0gV2PW2BrOL0nnNBDHFPpn.', 'Distributor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `d_orders`
--
ALTER TABLE `d_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `p_orders`
--
ALTER TABLE `p_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `rOrderId` (`rOrderId`);

--
-- Indexes for table `r_orders`
--
ALTER TABLE `r_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `dOrderId` (`dOrderId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `d_orders`
--
ALTER TABLE `d_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `p_orders`
--
ALTER TABLE `p_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `r_orders`
--
ALTER TABLE `r_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `d_orders`
--
ALTER TABLE `d_orders`
  ADD CONSTRAINT `d_orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `d_orders_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `p_orders`
--
ALTER TABLE `p_orders`
  ADD CONSTRAINT `p_orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `p_orders_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `p_orders_ibfk_3` FOREIGN KEY (`rOrderId`) REFERENCES `r_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `r_orders`
--
ALTER TABLE `r_orders`
  ADD CONSTRAINT `r_orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `r_orders_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `r_orders_ibfk_3` FOREIGN KEY (`dOrderId`) REFERENCES `d_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
